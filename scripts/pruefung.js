/* Tippkompass – Prüfung der Weltrangliste.
 * Läuft gleich im Browser (Testversion) und auf GitHub (scripts/rangliste.mjs).
 * Rechnet jede Wette selbst nach. Nur was hier gültig ist, zählt.
 *
 * Eingabe:
 *   wetten: [{ id, uid, ts (Serverzeit, ms), einsatz, picks: [{ g, k, q }] }]
 *   spiele: [{ id, zeit, sport, p: { h, u?, a }, res? }]   (aktuelle Spiele + Archiv)
 *   start:  Beginn der Woche (ms); nur Wetten ab dann zählen
 *   now:    jetzt (ms)
 * Ausgabe: { spieler: { uid: { gewinn, stand, wetten, gueltig, offen, verstoesse[], gesperrt, hinweise[] } } }
 */
(function (root) {
  const BUDGET = 1000;          // Wochen-Spielgeld für die Weltrangliste
  const MAX_EINSATZ = 1000;
  const MAX_PICKS = 10;
  const TOLERANZ = 1.35;        // Quoten schwanken; mehr als +35 % über unserer Quote gilt als manipuliert
  const SPAM = 300;             // mehr Wetten pro Woche: Hinweis (keine Sperre)
  const ABRECHNUNG = 3 * 3600e3; // Wette gilt 3 h nach dem letzten Anpfiff als abgerechnet
  const KULANZ = 2 * 60e3;       // bis 2 Min. nach Anpfiff: Wette nur ignorieren (langsames Netz), nicht sperren
  const MAX_UEBERZOGEN = 3;      // so oft "zu viel gesetzt" pro Woche, bevor gesperrt wird (z. B. zwei Handys)

  const quote = (g, k) => Math.max(1.03, (100 / g.p[k]) * 0.94);
  const r2 = (x) => Math.round(x * 100) / 100;

  function pruefeWette(w, spiele, now) {
    const v = [], weich = [];
    if (typeof w.einsatz !== "number" || !isFinite(w.einsatz)) v.push("Einsatz ist keine Zahl");
    else if (w.einsatz < 1) v.push("Einsatz kleiner als Fr. 1");
    else if (w.einsatz > MAX_EINSATZ) v.push("Einsatz über Fr. " + MAX_EINSATZ);
    if (typeof w.ts !== "number" || !isFinite(w.ts)) v.push("Keine Serverzeit");
    else if (w.ts > now + 60e3) v.push("Zeit liegt in der Zukunft");
    if (!Array.isArray(w.picks) || w.picks.length < 1 || w.picks.length > MAX_PICKS) { v.push("Ungültige Anzahl Tipps"); return { v, weich, spiele: [] }; }
    const gs = [], gesehen = new Set();
    for (const p of w.picks) {
      const g = p && spiele.get(p.g);
      if (!g) { v.push("Spiel gibt es nicht (" + (p && p.g) + ")"); continue; }
      if (gesehen.has(g.id)) v.push("Gleiches Spiel zweimal in einer Kombi");
      gesehen.add(g.id);
      if (!["h", "u", "a"].includes(p.k) || g.p[p.k] == null) { v.push("Ungültiger Ausgang bei " + g.h + " – " + g.a); continue; }
      if (typeof p.q !== "number" || !isFinite(p.q) || p.q < 1) v.push("Ungültige Quote");
      else if (p.q > quote(g, p.k) * TOLERANZ + 0.05) v.push("Quote " + p.q + " statt höchstens " + r2(quote(g, p.k) * TOLERANZ) + " bei " + g.h + " – " + g.a);
      const anpfiff = new Date(g.zeit).getTime();
      if (typeof w.ts === "number" && w.ts >= anpfiff) (w.ts < anpfiff + KULANZ ? weich : v).push("Nach dem Anpfiff gesetzt: " + g.h + " – " + g.a);
      gs.push({ g, p });
    }
    return { v, weich, spiele: gs };
  }

  function ergebnis(w, gs) {
    // null = offen, sonst Auszahlung
    let ausz = w.einsatz, offen = false;
    for (const { g, p } of gs) {
      if (g.res === "x") return { ausz: w.einsatz, offen: false, zurueck: true };
      if (!g.res) { offen = true; continue; }
      if (g.res !== p.k) return { ausz: 0, offen: false };
      ausz *= p.q;
    }
    return offen ? { ausz: null, offen: true } : { ausz: r2(ausz), offen: false };
  }

  function pruefe({ wetten, spiele, start, now }) {
    const sp = new Map(spiele.map((g) => [g.id, g]));
    const proSpieler = {};
    for (const w of wetten) {
      if (!w || typeof w.uid !== "string") continue;
      if (typeof w.ts === "number" && w.ts < start) continue;
      (proSpieler[w.uid] = proSpieler[w.uid] || []).push(w);
    }
    const out = {};
    for (const uid of Object.keys(proSpieler)) {
      const liste = proSpieler[uid].slice().sort((a, b) => (a.ts || 0) - (b.ts || 0));
      const s = { gewinn: 0, stand: BUDGET, wetten: liste.length, gueltig: 0, offen: 0, ignoriert: 0, verstoesse: [], hinweise: [], gesperrt: false };
      const ids = new Set();
      // Ereignisse: Einsatz bei Abgabe, Auszahlung bei Abrechnung – chronologisch, damit das Budget stimmt
      const ereignisse = [];
      for (const w of liste) {
        if (ids.has(w.id)) { s.ignoriert++; s.hinweise.push("Gleiche Wette doppelt eingereicht (ignoriert)"); continue; }
        ids.add(w.id);
        const { v, weich, spiele: gs } = pruefeWette(w, sp, now);
        if (v.length) { v.forEach((grund) => s.verstoesse.push({ wette: w.id, grund })); continue; }
        if (weich.length) { s.ignoriert++; weich.forEach((x) => s.hinweise.push(x + " (ignoriert)")); continue; }
        const e = ergebnis(w, gs);
        const letzter = Math.max(...gs.map((x) => new Date(x.g.zeit).getTime()));
        ereignisse.push({ t: w.ts, typ: "einsatz", w, betrag: w.einsatz });
        if (!e.offen && letzter + ABRECHNUNG <= now) ereignisse.push({ t: letzter + ABRECHNUNG, typ: "auszahlung", w, betrag: e.ausz });
      }
      ereignisse.sort((a, b) => a.t - b.t || (a.typ === "auszahlung" ? -1 : 1));
      let stand = BUDGET; const abgelehnt = new Set(); let ueberzogen = 0;
      for (const ev of ereignisse) {
        if (abgelehnt.has(ev.w.id)) continue;
        if (ev.typ === "einsatz") {
          if (ev.betrag > stand + 0.001) { ueberzogen++; s.ignoriert++; s.hinweise.push("Mehr gesetzt als Wochen-Spielgeld übrig (" + r2(stand) + "), ignoriert"); abgelehnt.add(ev.w.id); continue; }
          stand -= ev.betrag; s.gueltig++;
        } else stand += ev.betrag;
      }
      const ausgezahlt = new Set(ereignisse.filter((x) => x.typ === "auszahlung").map((x) => x.w));
      const offeneE = ereignisse.filter((ev) => ev.typ === "einsatz" && !abgelehnt.has(ev.w.id) && !ausgezahlt.has(ev.w));
      s.offen = offeneE.length;
      const offenEinsatz = offeneE.reduce((t, ev) => t + ev.betrag, 0);
      s.stand = r2(stand);
      s.gewinn = r2(stand + offenEinsatz - BUDGET); // nur abgerechnete Wetten zählen
      if (liste.length > SPAM) s.hinweise.push("Sehr viele Wetten (" + liste.length + ")");
      if (ueberzogen >= MAX_UEBERZOGEN) s.verstoesse.push({ wette: null, grund: ueberzogen + "-mal mehr gesetzt als Wochen-Spielgeld" });
      s.gesperrt = s.verstoesse.length > 0;
      out[uid] = s;
    }
    return { spieler: out };
  }

  function rangliste(ergebnisse, namen) {
    // namen: { uid: { nick, gesperrt (bisherige Sperre) } }
    const zeilen = Object.entries(ergebnisse.spieler).map(([uid, s]) => ({ uid, nick: (namen[uid] && namen[uid].nick) || "Spieler", gewinn: s.gewinn, gesperrt: s.gesperrt || !!(namen[uid] && namen[uid].gesperrt), gueltig: s.gueltig }));
    const gut = zeilen.filter((z) => !z.gesperrt).sort((a, b) => b.gewinn - a.gewinn || b.gueltig - a.gueltig);
    gut.forEach((z, i) => (z.platz = i + 1));
    return { liste: gut, gesperrt: zeilen.filter((z) => z.gesperrt) };
  }

  // Beginn der Woche: Montag 00:00 Uhr Schweizer Zeit
  function wochenStart(ms) {
    const f = new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zurich", weekday: "short", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });
    const t = Object.fromEntries(f.formatToParts(new Date(ms)).map((x) => [x.type, x.value]));
    const wd = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"].indexOf(t.weekday);
    const lokalMitternacht = ms - (Number(t.hour) * 3600e3 + Number(t.minute) * 60e3) - (ms % 60e3);
    return Math.round((lokalMitternacht - wd * 864e5) / 60e3) * 60e3;
  }

  const api = { pruefe, rangliste, wochenStart, quote, BUDGET, MAX_EINSATZ, TOLERANZ };
  if (typeof module !== "undefined" && module.exports) module.exports = api;
  else root.Pruefung = api;
})(typeof self !== "undefined" ? self : this);
