let STAND = "2026-11-12T14:50:00+01:00";
let SPIELE = [
  // Eishockey NHL (Wahrscheinlichkeit inkl. Verlängerung)
  { id: "n1", sport: "hockey", liga: "NHL", zeit: "2026-11-12T17:00:00Z", h: "Seattle Kraken", a: "Carolina Hurricanes", p: { h: 27.1, a: 72.9 } },
  { id: "n2", sport: "hockey", liga: "NHL", zeit: "2026-11-13T00:00:00Z", h: "Boston Bruins", a: "Montreal Canadiens", p: { h: 52.8, a: 47.2 } },
  { id: "n3", sport: "hockey", liga: "NHL", zeit: "2026-11-13T00:00:00Z", h: "Toronto Maple Leafs", a: "Minnesota Wild", p: { h: 39.9, a: 60.1 } },
  { id: "n4", sport: "hockey", liga: "NHL", zeit: "2026-11-13T00:00:00Z", h: "New Jersey Devils", a: "Washington Capitals", p: { h: 57.4, a: 42.6 } },
  { id: "n5", sport: "hockey", liga: "NHL", zeit: "2026-11-13T00:00:00Z", h: "Columbus Blue Jackets", a: "Tampa Bay Lightning", p: { h: 49.1, a: 50.9 } },
  { id: "n6", sport: "hockey", liga: "NHL", zeit: "2026-11-13T00:00:00Z", h: "Ottawa Senators", a: "Colorado Avalanche", p: { h: 48.7, a: 51.3 } },
  { id: "n7", sport: "hockey", liga: "NHL", zeit: "2026-11-13T00:30:00Z", h: "Florida Panthers", a: "Detroit Red Wings", p: { h: 60.3, a: 39.7 } },
  { id: "n8", sport: "hockey", liga: "NHL", zeit: "2026-11-13T01:00:00Z", h: "Dallas Stars", a: "Winnipeg Jets", p: { h: 61.0, a: 39.0 } },
  { id: "n9", sport: "hockey", liga: "NHL", zeit: "2026-11-13T01:00:00Z", h: "Chicago Blackhawks", a: "Buffalo Sabres", p: { h: 41.7, a: 58.3 } },
  { id: "n10", sport: "hockey", liga: "NHL", zeit: "2026-11-13T02:00:00Z", h: "Utah Mammoth", a: "St. Louis Blues", p: { h: 52.0, a: 48.0 } },
  // Fussball Bundesliga
  { id: "b1", sport: "fussball", liga: "Bundesliga", zeit: "2026-11-20T19:30:00Z", h: "Bayern München", a: "1. FC Köln", p: { h: 88.9, u: 7.3, a: 3.8 } },
  { id: "b2", sport: "fussball", liga: "Bundesliga", zeit: "2026-11-21T14:30:00Z", h: "Bayer Leverkusen", a: "SC Paderborn", p: { h: 76.4, u: 13.7, a: 9.9 } },
  { id: "b3", sport: "fussball", liga: "Bundesliga", zeit: "2026-11-21T14:30:00Z", h: "Eintracht Frankfurt", a: "TSG Hoffenheim", p: { h: 39.9, u: 24.0, a: 36.1 } },
  { id: "b4", sport: "fussball", liga: "Bundesliga", zeit: "2026-11-21T14:30:00Z", h: "Union Berlin", a: "RB Leipzig", p: { h: 18.0, u: 20.5, a: 61.5 } },
  { id: "b5", sport: "fussball", liga: "Bundesliga", zeit: "2026-11-21T14:30:00Z", h: "Gladbach", a: "Borussia Dortmund", p: { h: 19.7, u: 21.2, a: 59.1 } },
  { id: "b6", sport: "fussball", liga: "Bundesliga", zeit: "2026-11-21T14:30:00Z", h: "SV Elversberg", a: "SC Freiburg", p: { h: 28.8, u: 25.1, a: 46.1 } },
  { id: "b7", sport: "fussball", liga: "Bundesliga", zeit: "2026-11-21T17:30:00Z", h: "Schalke 04", a: "VfB Stuttgart", p: { h: 24.5, u: 23.2, a: 52.3 } },
  { id: "b8", sport: "fussball", liga: "Bundesliga", zeit: "2026-11-22T14:30:00Z", h: "FC Augsburg", a: "FSV Mainz", p: { h: 35.3, u: 24.6, a: 40.1 } },
  { id: "b9", sport: "fussball", liga: "Bundesliga", zeit: "2026-11-22T16:30:00Z", h: "Werder Bremen", a: "Hamburger SV", p: { h: 56.9, u: 22.3, a: 20.8 } },
  // Fussball Premier League
  { id: "e1", sport: "fussball", liga: "Premier League", zeit: "2026-11-21T12:30:00Z", h: "Manchester City", a: "Fulham", p: { h: 68.0, u: 18.1, a: 13.9 } },
  { id: "e2", sport: "fussball", liga: "Premier League", zeit: "2026-11-21T15:00:00Z", h: "Aston Villa", a: "Sunderland", p: { h: 54.5, u: 24.6, a: 20.9 } },
  { id: "e3", sport: "fussball", liga: "Premier League", zeit: "2026-11-21T15:00:00Z", h: "Bournemouth", a: "Nottingham Forest", p: { h: 46.8, u: 26.7, a: 26.5 } },
  { id: "e4", sport: "fussball", liga: "Premier League", zeit: "2026-11-21T15:00:00Z", h: "Chelsea", a: "Leeds United", p: { h: 50.9, u: 25.2, a: 23.9 } },
  { id: "e5", sport: "fussball", liga: "Premier League", zeit: "2026-11-21T15:00:00Z", h: "Coventry City", a: "Crystal Palace", p: { h: 40.4, u: 26.3, a: 33.3 } },
  { id: "e6", sport: "fussball", liga: "Premier League", zeit: "2026-11-21T15:00:00Z", h: "Tottenham", a: "Ipswich Town", p: { h: 62.1, u: 21.1, a: 16.8 } },
  { id: "e7", sport: "fussball", liga: "Premier League", zeit: "2026-11-21T17:30:00Z", h: "Newcastle", a: "Arsenal", p: { h: 16.9, u: 22.1, a: 61.0 } },
  { id: "e8", sport: "fussball", liga: "Premier League", zeit: "2026-11-22T14:00:00Z", h: "Hull City", a: "Brighton", p: { h: 15.8, u: 20.6, a: 63.6 } },
  { id: "e9", sport: "fussball", liga: "Premier League", zeit: "2026-11-22T16:30:00Z", h: "Liverpool", a: "Manchester United", p: { h: 56.0, u: 22.4, a: 21.6 } },
  { id: "e10", sport: "fussball", liga: "Premier League", zeit: "2026-11-23T20:00:00Z", h: "Brentford", a: "Everton", p: { h: 46.1, u: 26.2, a: 27.7 } },
  // Fussball Champions League
  { id: "c1", sport: "fussball", liga: "Champions League", zeit: "2026-11-24T17:45:00Z", h: "Bodø/Glimt", a: "LASK Linz", p: { h: 63.0, u: 18.6, a: 18.4 } },
  { id: "c2", sport: "fussball", liga: "Champions League", zeit: "2026-11-24T17:45:00Z", h: "Galatasaray", a: "Aston Villa", p: { h: 36.4, u: 24.2, a: 39.4 } },
  { id: "c3", sport: "fussball", liga: "Champions League", zeit: "2026-11-24T20:00:00Z", h: "Arsenal", a: "Borussia Dortmund", p: { h: 69.0, u: 18.5, a: 12.5 } },
  { id: "c4", sport: "fussball", liga: "Champions League", zeit: "2026-11-24T20:00:00Z", h: "Como 1907", a: "AEK Athen", p: { h: 73.2, u: 15.5, a: 11.3 } },
  { id: "c5", sport: "fussball", liga: "Champions League", zeit: "2026-11-24T20:00:00Z", h: "Feyenoord", a: "FC Porto", p: { h: 33.6, u: 25.3, a: 41.1 } },
  { id: "c6", sport: "fussball", liga: "Champions League", zeit: "2026-11-24T20:00:00Z", h: "Manchester City", a: "SSC Napoli", p: { h: 77.6, u: 13.4, a: 9.0 } },
  { id: "c7", sport: "fussball", liga: "Champions League", zeit: "2026-11-24T20:00:00Z", h: "RB Leipzig", a: "RC Lens", p: { h: 68.3, u: 16.8, a: 14.9 } },
  { id: "c8", sport: "fussball", liga: "Champions League", zeit: "2026-11-24T20:00:00Z", h: "Real Madrid", a: "PSV Eindhoven", p: { h: 81.5, u: 10.7, a: 7.8 } },
  { id: "c9", sport: "fussball", liga: "Champions League", zeit: "2026-11-24T20:00:00Z", h: "Slovan Bratislava", a: "Real Betis", p: { h: 10.3, u: 14.8, a: 74.9 } },
  { id: "c10", sport: "fussball", liga: "Champions League", zeit: "2026-11-25T17:45:00Z", h: "Sabah", a: "FC Barcelona", p: { h: 4.4, u: 6.6, a: 89.0 } },
];

/* Meine Top-Tipps mit Begründung (aus den letzten Resultaten) */
let TOPS = [
  { id: "n1", wahl: "a", text: "Heute Abend. Carolina ist klarer Favorit, die Daten geben Seattle nur gut jede vierte Chance." },
  { id: "b1", wahl: "h", text: "Bayern hat zuletzt in Mainz 2:1 gewonnen, Köln verlor zuhause 1:2 gegen Leverkusen. Der sicherste Tipp im Fussball-Angebot." },
  { id: "c8", wahl: "h", text: "Real gewann zuletzt in Athen 3:2, PSV verlor in der Champions League zuhause gegen Brügge." },
  { id: "c10", wahl: "a", text: "Barcelona ist in Sabah haushoher Favorit. Nur: Bei so klaren Spielen ist die Quote meist sehr tief." },
  { id: "b2", wahl: "h", text: "Leverkusen hat zuletzt das Derby in Köln gewonnen. Paderborn holte aber gegen Frankfurt ein 2:2, also nicht unterschätzen." },
  { id: "c6", wahl: "h", text: "City gewann in der Champions League 3:2 in Leipzig, verlor aber in der Liga 1:3 in Nottingham. Favorit, aber kein Selbstläufer." },
];

/* Letzte Resultate (für die Form-Analyse), Quelle: Sportradar */
let RESULTATE = [
  ["2026-11-01","Eintracht Frankfurt","Hamburger SV",3,1],["2026-11-06","Hamburger SV","Gladbach",3,1],["2026-11-07","Borussia Dortmund","SV Elversberg",2,1],
  ["2026-11-07","RB Leipzig","FC Augsburg",5,2],["2026-11-07","FSV Mainz","Bayern München",1,2],["2026-11-07","SC Paderborn","Eintracht Frankfurt",2,2],
  ["2026-11-07","VfB Stuttgart","Werder Bremen",1,0],["2026-11-08","1. FC Köln","Bayer Leverkusen",1,2],["2026-11-08","SC Freiburg","Union Berlin",2,0],
  ["2026-11-08","TSG Hoffenheim","Schalke 04",2,1],
  ["2026-11-06","Everton","Coventry City",3,1],["2026-11-07","Leeds United","Tottenham",1,0],["2026-11-07","Arsenal","Hull City",1,0],["2026-11-07","Fulham","Newcastle",1,1],
  ["2026-11-07","Nottingham Forest","Manchester City",3,1],["2026-11-08","Brighton","Brentford",2,0],["2026-11-08","Crystal Palace","Liverpool",1,3],
  ["2026-11-08","Ipswich Town","Bournemouth",1,2],["2026-11-08","Sunderland","Chelsea",1,0],["2026-11-08","Manchester United","Aston Villa",4,4],
  ["2026-11-03","Villarreal","Paris Saint-Germain",0,6],["2026-11-04","AEK Athen","Real Madrid",2,3],["2026-11-04","Fenerbahçe","Liverpool",3,2],
  ["2026-11-04","Borussia Dortmund","Real Betis",2,1],["2026-11-04","FC Porto","SSC Napoli",4,1],["2026-11-04","PSV Eindhoven","Club Brugge",1,2],
  ["2026-11-04","RB Leipzig","Manchester City",2,3],["2026-11-04","RC Lens","Como 1907",1,9],["2026-11-04","Slavia Prag","Arsenal",1,2],["2026-11-04","Viking FK","Sabah",4,1],
  ["2026-11-08","Winnipeg Jets","Tampa Bay Lightning",4,3],["2026-11-08","Toronto Maple Leafs","New Jersey Devils",0,4],["2026-11-09","Calgary Flames","Philadelphia Flyers",4,3],
  ["2026-11-09","Edmonton Oilers","New York Rangers",3,1],["2026-11-10","San Jose Sharks","New York Islanders",3,2],["2026-11-10","Winnipeg Jets","New Jersey Devils",4,2],
  ["2026-11-10","Toronto Maple Leafs","Colorado Avalanche",3,6],["2026-11-10","Montreal Canadiens","Minnesota Wild",1,2],["2026-11-10","Ottawa Senators","Washington Capitals",2,3],
  ["2026-11-10","Columbus Blue Jackets","Florida Panthers",1,4],["2026-11-10","St. Louis Blues","Detroit Red Wings",3,2],["2026-11-10","Los Angeles Kings","Nashville Predators",0,3],
  ["2026-11-11","Buffalo Sabres","Tampa Bay Lightning",3,8],["2026-11-11","Calgary Flames","New York Rangers",1,3],["2026-11-11","Edmonton Oilers","Philadelphia Flyers",3,2],
  ["2026-11-11","Vegas Golden Knights","Utah Mammoth",5,3],["2026-11-11","San Jose Sharks","Pittsburgh Penguins",2,3],["2026-11-11","Anaheim Ducks","Nashville Predators",2,4],
].map(([d, h, a, hs, as]) => ({ d, h, a, hs, as }));

/* Bilanz: nach jedem Update trage ich hier ein, wie meine Top-Tipps ausgegangen sind.
   { spiel: "Bayern – Köln", tipp: "Bayern", treffer: true, resultat: "3:0" } */
const BILANZ = [];

function form(team) {
  return RESULTATE.filter((r) => r.h === team || r.a === team).sort((x, y) => y.d.localeCompare(x.d)).slice(0, 3).map((r) => {
    const home = r.h === team, mine = home ? r.hs : r.as, theirs = home ? r.as : r.hs;
    return { k: mine > theirs ? "S" : mine === theirs ? "U" : "N", txt: mine + ":" + theirs + (home ? " gegen " : " in ") + (home ? r.a : r.h) };
  });
}



/* ================================================================
   Tippkompass – Tipp-Assistent
   ================================================================ */
const sportName = { fussball: "Fussball", hockey: "Eishockey", tennis: "Tennis" };
const $ = (s) => document.querySelector(s);
const h = (tag, cls, text) => { const e = document.createElement(tag); if (cls) e.className = cls; if (text != null) e.textContent = text; return e; };
const tz = "Europe/Zurich";
const fmtDay = new Intl.DateTimeFormat("de-CH", { weekday: "long", day: "numeric", month: "long", timeZone: tz });
const fmtTime = new Intl.DateTimeFormat("de-CH", { hour: "2-digit", minute: "2-digit", timeZone: tz });
const fmtShort = new Intl.DateTimeFormat("de-CH", { weekday: "short", day: "numeric", month: "short", timeZone: tz });
const fmtDate = new Intl.DateTimeFormat("de-CH", { day: "numeric", month: "long", timeZone: tz });
const pct = (v) => Math.round(v) + " %";
const num = (n, d = 0) => n.toLocaleString("de-CH", { minimumFractionDigits: d, maximumFractionDigits: d });
const fr = (n) => "Fr. " + num(n, 2);
const now = new Date();
const MARGE = 0.06;
let TIPP_DER_WOCHE = "e9";          // Spiel für die Abstimmung (bei jedem Update neu wählen)
const RHYTHMUS = "Quoten und Resultate 3x täglich aktualisiert · Rückblick jeden Montag";

const store = {
  get(k, d) { try { const v = localStorage.getItem("tk_" + k); return v ? JSON.parse(v) : d; } catch { return d; } },
  set(k, v) { try { localStorage.setItem("tk_" + k, JSON.stringify(v)); } catch {} },
};

/* ---------- State ---------- */
let profil = store.get("profil3", null);   // {nick, adult, gruppe}
let wetten = store.get("wetten3", []);     // Gruppen-Wetten [{id, ts, einsatz, picks:[{g,k,q}]}]
let risiko = store.get("risiko", "sicher"); if (risiko === "mutig") risiko = "mittel";
let schein = [];
let sport = "alle";
let onlyClear = store.get("onlyClear", false);
let mitglieder = [];                       // andere Spieler aus der Datenbank
let flynn = {};                            // {spielId: {k, typ: "setzen"|"finger"}}
let gruppe = null;                         // {name, start, ende}
let offenMitglied = null;
let mehrTipps = false;
let votes = store.get("votes", {});   // eigene Stimmen {spielId: k}
let team = store.get("team", "");
let gespielt = store.get("gespielt", []);
const SOLO_START = 1000;
let solo = store.get("solo", []);            // eigene Spielgeld-Wetten ohne Gruppe [{id, ts, einsatz, picks}]
let konto_ziel = store.get("konto_ziel", "solo"); // "solo" | "gruppe"  // für Sporttip kopierte Tipps [{ts, picks:[{g,k,q}]}]
let db = null, me = null, isOwner = false, authUser = null, fb = null;
const OWNER_EMAILS = []; // hier deine E-Mail eintragen, damit du «Setzen/Finger weg» markieren kannst

/* ---------- Spiele und Quoten ---------- */
function quote(p) { return Math.max(1.03, Math.round(100 / p * (1 - MARGE) * 100) / 100); }
function outcomes(g) {
  const o = [{ k: "h", label: g.h, short: "1", p: g.p.h }];
  if (g.p.u != null) o.push({ k: "u", label: "Unentschieden", short: "X", p: g.p.u });
  o.push({ k: "a", label: g.a, short: "2", p: g.p.a });
  return o.map((x) => ({ ...x, q: quote(x.p) }));
}
const bestOf = (g) => outcomes(g).reduce((a, b) => (b.p > a.p ? b : a));
const spiel = (id) => SPIELE.find((x) => x.id === id);
const offen = (g) => !g.res && new Date(g.zeit) > now;
const label = (g, k) => (k === "u" ? "Unentschieden" : k === "h" ? g.h : g.a);
const out = (g, k) => outcomes(g).find((o) => o.k === k);
function stufe(p) {
  if (p >= 70) return { t: "Sicher ●●●", c: "s-sicher" };
  if (p >= 55) return { t: "Mittel ●●○", c: "s-mittel" };
  return { t: "Riskant ●○○", c: "s-riskant" };
}

/* Eigene Einschätzung. Ohne eigene Markierung gilt der Daten-Vorschlag. */
function einschaetzung(g) {
  const f = flynn[g.id];
  if (f) return { ...f, auto: false };
  const b = bestOf(g);
  if (b.p >= 55) return { k: b.k, typ: "setzen", auto: true };
  if (b.p < 45) return { typ: "finger", auto: true };
  return null;
}

/* ---------- Gruppen-Wetten ---------- */
function status(w) {
  let alle = true;
  for (const p of w.picks) {
    const g = spiel(p.g);
    if (!g || !g.res) { alle = false; continue; }
    if (g.res !== p.k) return "verloren";
  }
  return alle ? "gewonnen" : "offen";
}
const wQuote = (w) => w.picks.reduce((t, p) => t * p.q, 1);
function konto(list, start) {
  let k = start, gew = 0;
  list.forEach((w) => { k -= w.einsatz; if (status(w) === "gewonnen") { k += w.einsatz * wQuote(w); gew += w.einsatz * wQuote(w) - w.einsatz; } else if (status(w) === "verloren") gew -= w.einsatz; });
  const fertig = list.filter((w) => status(w) !== "offen");
  return { stand: k, gewinn: gew, treffer: fertig.filter((w) => status(w) === "gewonnen").length, fertig: fertig.length, offen: list.length - fertig.length, einsatzOffen: list.filter((w) => status(w) === "offen").reduce((t, w) => t + w.einsatz, 0) };
}


/* ================================================================
   Fortschritt, Titel, Rückblick (belohnt richtige Tipps, nie Einsätze)
   ================================================================ */
const wocheVon = (d) => { const x = new Date(d); const day = (x.getDay() + 6) % 7; x.setHours(12, 0, 0, 0); x.setDate(x.getDate() - day); return x.getFullYear() + "-" + String(x.getMonth() + 1).padStart(2, "0") + "-" + String(x.getDate()).padStart(2, "0"); };
function picksAus(list) {
  const out = [];
  (list || []).forEach((w) => w.picks.forEach((p) => { const g = spiel(p.g); if (g && g.res) out.push({ g, k: p.k, ok: g.res === p.k, w }); }));
  return out.sort((a, b) => new Date(a.g.zeit) - new Date(b.g.zeit));
}
function maxSerie(ps) { let m = 0, c = 0; ps.forEach((p) => { c = p.ok ? c + 1 : 0; m = Math.max(m, c); }); return m; }
function abzeichen(list) {
  const ps = picksAus(list), richtig = ps.filter((p) => p.ok);
  const kombi = (list || []).some((w) => w.picks.length >= 3 && status(w) === "gewonnen");
  return [
    { id: "erster", t: "Erster Treffer", d: "Deinen ersten Tipp richtig gehabt", ok: richtig.length >= 1, ic: "I" },
    { id: "serie", t: "3er-Serie", d: "Drei Tipps hintereinander richtig", ok: maxSerie(ps) >= 3, ic: "II" },
    { id: "zehn", t: "10 Treffer", d: "Zehn Tipps richtig", ok: richtig.length >= 10, ic: "III" },
    { id: "schreck", t: "Favoritenschreck", d: "Richtig auf den Aussenseiter getippt", ok: richtig.some((p) => p.k !== bestOf(p.g).k), ic: "IV" },
    { id: "kombi", t: "Kombi geknackt", d: "Eine Kombi mit 3 oder mehr Tipps gewonnen", ok: kombi, ic: "V" },
  ];
}
function letzteWoche() {
  const ws = SPIELE.filter((g) => g.res).map((g) => wocheVon(g.zeit)).sort();
  return ws.length ? ws[ws.length - 1] : null;
}
function wochenGewinn(list, wk) {
  let g = 0;
  (list || []).forEach((w) => {
    const st = status(w); if (st === "offen") return;
    const last = w.picks.map((p) => spiel(p.g)).filter(Boolean).map((x) => x.zeit).sort().pop();
    if (!last || wocheVon(last) !== wk) return;
    g += st === "gewonnen" ? w.einsatz * wQuote(w) - w.einsatz : -w.einsatz;
  });
  return g;
}
function titel(rows) {
  const wk = letzteWoche(); const t = {};
  if (!wk) return t;
  const gew = rows.map((m) => ({ m, v: wochenGewinn(m.wetten, wk) })).sort((a, b) => b.v - a.v);
  if (gew[0] && gew[0].v > 0) (t[gew[0].m.id] ||= []).push("Tippkönig der Woche");
  let best = null;
  rows.forEach((m) => (m.wetten || []).forEach((w) => { if (w.picks.length > 1 && status(w) === "gewonnen" && (!best || wQuote(w) > best.q)) best = { id: m.id, q: wQuote(w) }; }));
  if (best) (t[best.id] ||= []).push("Beste Kombi");
  rows.forEach((m) => {
    const ps = picksAus(m.wetten);
    if (ps.some((p) => p.ok && p.k !== bestOf(p.g).k)) (t[m.id] ||= []).push("Favoritenschreck");
    if (ps.length >= 5 && ps.filter((p) => p.ok).length / ps.length >= .6) (t[m.id] ||= []).push("Treffsicher");
  });
  return t;
}
function rueckblick(rows) {
  const wk = letzteWoche();
  const card = h("div", "rb");
  card.append(h("div", "rb-k", "Wochen-Rückblick"));
  if (!wk) { card.append(h("div", "rb-t", "Nach dem ersten Spieltag steht hier, wer gewonnen hat, der beste Tipp und die grösste Überraschung.")); return card; }
  const spiele = SPIELE.filter((g) => g.res && wocheVon(g.zeit) === wk);
  card.append(h("div", "rb-t", "Woche ab " + fmtDate.format(new Date(wk + "T12:00:00"))));
  const grid = h("div", "rb-grid");
  const add = (ic, l, v) => { const d = h("div", "rb-item"); d.append(h("span", "rb-l", l), h("b", null, v)); grid.append(d); };
  const gew = rows.map((m) => ({ m, v: wochenGewinn(m.wetten, wk) })).sort((a, b) => b.v - a.v);
  if (gew[0] && gew[0].v > 0) add("", "Sieger der Woche", gew[0].m.nick + " (+" + fr(gew[0].v) + ")");
  let best = null;
  rows.forEach((m) => (m.wetten || []).forEach((w) => { if (status(w) === "gewonnen" && (!best || wQuote(w) > best.q)) best = { n: m.nick, q: wQuote(w) }; }));
  if (best) add("", "Bester Tipp", best.n + " mit Quote " + num(best.q, 2));
  const ueb = spiele.filter((g) => g.res !== bestOf(g).k).sort((a, b) => out(a, a.res).p - out(b, b.res).p)[0];
  if (ueb) add("", "Grösste Überraschung", label(ueb, ueb.res) + (ueb.res === "u" ? " bei " + ueb.h + " – " + ueb.a : "") + " (nur " + pct(out(ueb, ueb.res).p) + ")");
  const fl = spiele.map((g) => ({ g, e: flynn[g.id] })).filter((x) => x.e && x.e.typ === "setzen");
  if (fl.length) add("", "Meine Tipps", fl.filter((x) => x.g.res === x.e.k).length + " von " + fl.length + " richtig");
  if (!grid.children.length) card.append(h("div", "rb-t", "Diese Woche gab es noch keine ausgewerteten Wetten."));
  card.append(grid);
  return card;
}

/* Tipp der Woche: alle stimmen ab, ohne Einsatz */
function tippDerWoche() {
  const g = spiel(TIPP_DER_WOCHE);
  const box = $("#tdw"); box.replaceChildren();
  if (!g) { box.hidden = true; return; }
  box.hidden = false;
  box.append(h("div", "rb-k", "Tipp der Woche · Abstimmung ohne Einsatz"), h("div", "tdw-m", g.h + " – " + g.a), h("div", "tk-when", g.liga + " · " + fmtShort.format(new Date(g.zeit)) + ", " + fmtTime.format(new Date(g.zeit))));
  const alle = [...mitglieder.filter((m) => m.id !== me).map((m) => m.votes?.[g.id]).filter(Boolean)];
  if (votes[g.id]) alle.push(votes[g.id]);
  const n = alle.length;
  const row = h("div", "tdw-opts");
  outcomes(g).forEach((o) => {
    const c = alle.filter((v) => v === o.k).length;
    const b = h("button", "tdw-o");
    b.setAttribute("aria-pressed", String(votes[g.id] === o.k));
    const fill = h("i"); fill.style.width = (n ? c / n * 100 : 0) + "%";
    b.append(fill, h("span", null, o.short + " · " + (o.k === "u" ? "Unentschieden" : o.label)), h("b", null, votes[g.id] ? (n ? Math.round(c / n * 100) : 0) + " %" : ""));
    b.disabled = !offen(g) || g.res;
    b.onclick = () => { votes[g.id] = o.k; store.set("votes", votes); speichern(); tippDerWoche(); toast("Stimme gezählt"); };
    row.append(b);
  });
  box.append(row);
  if (g.res) box.append(h("div", "tk-when", "Resultat: " + label(g, g.res) + (votes[g.id] ? (votes[g.id] === g.res ? " · Du lagst richtig!" : " · Diesmal daneben.") : "")));
  else box.append(h("div", "tk-when", votes[g.id] ? n + (n === 1 ? " Stimme" : " Stimmen") + " bisher" : "Stimm ab, dann siehst du, was die anderen tippen."));
}

/* Lieblingsteam */
const alleTeams = () => [...new Set(SPIELE.flatMap((g) => [g.h, g.a]))].sort((a, b) => a.localeCompare(b, "de"));
function renderTeam() {
  const box = $("#teamBox"); box.replaceChildren();
  const gs = team ? SPIELE.filter((g) => offen(g) && (g.h === team || g.a === team)).sort((a, b) => new Date(a.zeit) - new Date(b.zeit)) : [];
  box.hidden = !gs.length;
  if (!gs.length) return;
  box.append(h("h2", null, "Dein Team: " + team));
  gs.forEach((g) => box.append(gameCard(g)));
}
function renderRitual() {
  const r = $("#ritual"); r.replaceChildren();
  const t = BILANZ.filter((b) => b.treffer).length;
  r.append(h("span", null, RHYTHMUS));
  r.append(h("b", null, BILANZ.length ? "Meine Trefferquote: " + Math.round(t / BILANZ.length * 100) + " % (" + t + "/" + BILANZ.length + ")" : "Meine Bilanz startet nach dem ersten Spieltag"));
}

/* ================================================================
   Tipps
   ================================================================ */
function toggle(g, k) {
  const i = schein.findIndex((s) => s.g === g);
  if (i >= 0 && schein[i].k === k) schein.splice(i, 1);
  else if (i >= 0) schein[i].k = k;
  else schein.push({ g, k });
  renderAll();
  toast(imSchein(g, k) ? "Zum Tippschein hinzugefügt" : "Entfernt");
}
const imSchein = (g, k) => schein.some((s) => s.g === g && s.k === k);
const passt = (g) => (sport === "alle" || g.sport === sport) && offen(g);

function tippKarte(g, e) {
  const o = out(g, e.k), st = stufe(o.p);
  const el = h("article", "tk");
  const top = h("div", "tk-top");
  const links = h("span", "tk-meta"); links.append(h("span", "src " + (e.auto ? "auto" : "own"), e.auto ? "Statistik" : "Mein Tipp"), h("span", "stufe " + st.c, st.t));
  top.append(links, h("b", "tk-ort", e.k === "h" ? "Heimspiel" : e.k === "a" ? "Auswärts" : "Unentschieden"));
  const when = h("div", "tk-when", g.liga + " · " + fmtShort.format(new Date(g.zeit)) + ", " + fmtTime.format(new Date(g.zeit)));
  const match = h("div", "tk-match", g.h + " – " + g.a);
  const pick = h("div", "tk-pick");
  pick.append(h("span", "tk-what", "Tipp: " + label(g, e.k) + (e.k === "u" ? "" : " gewinnt")));
  const nums = h("div", "tk-nums"); nums.append(h("b", null, num(o.q, 2)), h("span", null, "Quote"), h("b", null, pct(o.p)), h("span", null, "Chance"));
  const tip = TOPS.find((t) => t.id === g.id);
  const btn = h("button", "tk-add" + (imSchein(g.id, e.k) ? " on" : ""), imSchein(g.id, e.k) ? "Im Tippschein ✓" : "In den Tippschein");
  btn.onclick = () => toggle(g.id, e.k);
  el.append(top, when, match, pick, nums);
  if (e.note || tip) el.append(h("p", "tk-note", e.note || tip.text));
  el.append(btn);
  return el;
}

function kombiEl(k) {
  const q = k.legs.reduce((t, { g, e }) => t * out(g, e.k).q, 1);
  const p = k.legs.reduce((t, { g, e }) => t * out(g, e.k).p / 100, 1);
  const el = h("article", "kombi" + (k.gross ? " gross" : ""));
  const head = h("div", "kombi-head"); head.append(h("b", null, k.name), h("span", null, k.info));
  if (k.gross) { const ein = k.einsatz || 10; const hq = h("div", "kombi-big"); hq.append(h("span", null, "Mögliche Quote"), h("b", null, q >= 100 ? num(q, 0) : num(q, 2)), h("small", null, "Aus " + fr(ein) + " werden " + fr(ein * q))); head.append(hq); }
  const ul = h("ul");
  k.legs.forEach(({ g, e }) => { const li = h("li"); li.append(h("span", null, label(g, e.k) + (e.k === "u" ? "" : " gewinnt")), h("small", null, g.h + " – " + g.a), h("b", null, num(out(g, e.k).q, 2))); ul.append(li); });
  const nums = h("div", "kombi-nums"); if (!k.gross) nums.append(h("div", null, "Gesamtquote"), h("b", null, num(q, 2))); nums.append(h("div", null, "Chance, dass alles aufgeht"), h("b", null, p < 0.05 ? "etwa 1 zu " + num(Math.round(1 / p / 10) * 10, 0) : pct(p * 100)));
  const actions = h("div", "kombi-act");
  const take = h("button", "btn", "In den Tippschein"); take.onclick = () => { schein = k.legs.map(({ g, e }) => ({ g: g.id, k: e.k })); renderAll(); go("schein"); };
  const copy = h("button", "btn ghost", "Für Sporttip kopieren"); copy.onclick = () => kopieren(k.legs.map(({ g, e }) => ({ g: g.id, k: e.k })), k.name);
  actions.append(take, copy);
  el.append(head, ul, nums, actions);
  return el;
}

function renderEmpfehlungen() {
  const setzen = SPIELE.filter(passt).map((g) => ({ g, e: einschaetzung(g) })).filter((x) => x.e && x.e.typ === "setzen");
  const P = ({ g, e }) => out(g, e.k).p;
  const sicher = setzen.filter((x) => P(x) >= 70).sort((a, b) => P(b) - P(a));
  const mittel = setzen.filter((x) => P(x) >= 55 && P(x) < 70).sort((a, b) => P(b) - P(a));
  // Riskant: offene Spiele mit leichtem Favoriten (45–55 %), dazu eigene Tipps mit tiefer Chance
  const riskant = [
    ...SPIELE.filter(passt).filter((g) => !flynn[g.id]).map((g) => ({ g, b: bestOf(g) })).filter(({ b }) => b.p >= 45 && b.p < 55).map(({ g, b }) => ({ g, e: { k: b.k, typ: "setzen", auto: true } })),
    ...setzen.filter((x) => !x.e.auto && P(x) < 55),
  ].sort((a, b) => out(b.g, b.e.k).q - out(a.g, a.e.k).q);
  const STUFEN = {
    sicher: { list: sicher, titel: "Sichere Tipps", sub: "Starke Favoriten ab 70 % Chance. Tiefe Quote, dafür geht es meistens auf." },
    mittel: { list: mittel, titel: "Mittleres Risiko", sub: "55 bis 70 % Chance. Die Quote lohnt sich schon, und der Favorit gewinnt trotzdem meistens." },
    riskant: { list: riskant, titel: "Riskante Tipps", sub: "Knappe Spiele um 50 %. Hohe Quote, aber fast ein Münzwurf. Nur mit kleinem Einsatz." },
  };
  const st = STUFEN[risiko] || STUFEN.sicher;
  const list = st.list;
  $("#empTitle").textContent = st.titel;
  const erw = list.length ? list.reduce((t, x) => t + out(x.g, x.e.k).p, 0) / list.length : 0;
  $("#empSub").textContent = st.sub + (list.length ? " Wer alle diese Tipps einzeln spielt, liegt im Schnitt bei etwa " + Math.round(erw) + " % Treffern." : "");
  const box = $("#emp"); box.replaceChildren();
  if (!list.length) box.append(h("div", "empty", sport === "tennis" && !SPIELE.some((g) => g.sport === "tennis") ? "Tennis-Tipps kommen mit den ATP Finals in Turin (15. bis 22. November). Diese Woche laufen nur kleine Turniere, dazu gibt es keine verlässlichen Daten." : "Gerade keine Tipps in dieser Stufe. Schau bei einer anderen Stufe."));
  const max = mehrTipps ? list.length : 5;
  list.slice(0, max).forEach(({ g, e }) => box.append(tippKarte(g, e)));
  if (list.length > 5) { const m = h("button", "btn ghost", mehrTipps ? "Weniger anzeigen" : "Alle " + list.length + " Tipps anzeigen"); m.onclick = () => { mehrTipps = !mehrTipps; renderEmpfehlungen(); }; box.append(m); }

  // Kombi-Vorschlag passend zur gewählten Stufe
  const kb = $("#kombis"); kb.replaceChildren();
  const kombis = [];
  if (risiko === "sicher" && sicher.length >= 2) kombis.push({ name: "Sichere Kombi", info: "Die stärksten Favoriten zusammen.", legs: sicher.slice(0, 3) });
  if (risiko === "mittel" && mittel.length >= 2) kombis.push({ name: "Mittlere Kombi", info: "Drei Favoriten mit guter Quote.", legs: mittel.slice(0, 3) });
  if (risiko === "riskant" && riskant.length >= 2) kombis.push({ name: "Riskante Kombi", info: "Zwei knappe Spiele. Hohe Quote, wenig Chance.", legs: riskant.slice(0, 2) });
  $("#kombiWrap").hidden = !kombis.length;
  kombis.forEach((k) => kb.append(kombiEl(k)));

  // Meine Tipps: eine Kombi mit richtig guter möglicher Quote
  const eigene = setzen.filter((x) => !x.e.auto);
  let legs = eigene.length >= 2 ? eigene.slice(0, 5) : setzen.filter(({ g, e }) => { const p = out(g, e.k).p; return p >= 55 && p < 82; }).sort((a, b) => out(b.g, b.e.k).q - out(a.g, a.e.k).q).slice(0, 4);
  if (legs.length < 3) legs = [...legs, ...sicher.filter((x) => !legs.includes(x))].slice(0, 4);
  const mb = $("#meine"); mb.replaceChildren();
  $("#meineWrap").hidden = legs.length < 2;
  if (legs.length >= 2) mb.append(kombiEl({ name: "Meine Kombi", info: legs.length + " Tipps, auf die ich setzen würde.", legs, gross: true }));

  // Glückskombi: lange Kombi mit Quote um 150, für 1 Franken
  const pool = [...riskant, ...mittel].filter((x, i, arr) => arr.findIndex((y) => y.g.id === x.g.id) === i).sort((a, b) => out(b.g, b.e.k).q - out(a.g, a.e.k).q);
  const glueck = []; let gq = 1;
  for (const x of pool) { if (gq >= 140 || glueck.length >= 8) break; glueck.push(x); gq *= out(x.g, x.e.k).q; }
  const gb = $("#glueck"); gb.replaceChildren();
  $("#glueckWrap").hidden = gq < 50 || glueck.length < 3;
  if (gq >= 50 && glueck.length >= 3) gb.append(kombiEl({ name: "Glückskombi", info: glueck.length + " Spiele, alle müssen aufgehen.", legs: glueck, gross: true, einsatz: 1 }));

  // Finger weg
  const fw = SPIELE.filter(passt).map((g) => ({ g, e: einschaetzung(g) })).filter((x) => x.e && x.e.typ === "finger");
  const fb = $("#finger"); fb.replaceChildren();
  $("#fingerWrap").hidden = !fw.length;
  fw.forEach(({ g, e }) => {
    const el = h("div", "fw");
    const b = bestOf(g);
    el.append(h("div", "fw-m", g.h + " – " + g.a), h("div", "fw-i", g.liga + " · " + fmtShort.format(new Date(g.zeit)) + " · Favorit nur " + pct(b.p)));
    if (e.note) el.append(h("div", "fw-i", e.note));
    fb.append(el);
  });
}

function gameCard(g) {
  const el = h("article", "game");
  const head = h("div", "g-head"); head.append(h("span", null, sportName[g.sport] + " · " + g.liga), h("span", null, fmtTime.format(new Date(g.zeit))));
  const os = outcomes(g), best = bestOf(g);
  const bar = h("div", "bar"); bar.setAttribute("aria-hidden", "true");
  os.forEach((o) => { const i = h("i"); i.style.width = o.p + "%"; i.style.background = o.k === best.k ? "var(--rasen)" : (o.k === "u" ? "#B9C0B9" : "#8C958F"); bar.append(i); });
  const opts = h("div", "opts " + (os.length === 3 ? "three" : "two"));
  os.forEach((o) => {
    const b = h("button", "opt" + (o.k === best.k ? " best" : ""));
    b.setAttribute("aria-pressed", String(imSchein(g.id, o.k)));
    b.setAttribute("aria-label", label(g, o.k) + ", Quote " + num(o.q, 2) + ", Chance " + pct(o.p));
    b.append(h("small", null, o.short + " · " + (o.k === "u" ? "Unentschieden" : o.label)), h("b", null, num(o.q, 2)), h("small", "pp", pct(o.p)));
    b.onclick = () => toggle(g.id, o.k);
    opts.append(b);
  });
  const e = einschaetzung(g);
  const vd = h("div", "verdict");
  if (e && e.typ === "setzen") vd.append(h("span", "src " + (e.auto ? "auto" : "own"), (e.auto ? "Statistik spricht für " : "Ich setze auf ") + label(g, e.k)));
  else if (e && e.typ === "finger") vd.append(h("span", "src finger", e.auto ? "Zu offen" : "Finger weg"));
  else vd.append(h("span", "src none", "Keine klare Empfehlung"));
  const more = h("button", "more", "Analyse"); more.setAttribute("aria-expanded", "false");
  const an = h("div", "analyse"); an.hidden = true;
  const top = TOPS.find((t) => t.id === g.id);
  if (top) an.append(h("div", "why", top.text));
  [g.h, g.a].forEach((team) => {
    const tf = h("div", "team-form"); const ch = h("span", "chips"); const f = form(team);
    f.forEach((x) => { const c = h("span", x.k, x.k); c.title = x.txt; ch.append(c); });
    tf.append(h("span", "nm", team), ch, h("span", "last", f.length ? "Zuletzt: " + f.map((x) => x.txt).join(", ") : "Keine aktuellen Resultate in meinen Daten"));
    an.append(tf);
  });
  an.append(h("div", "last", "S = Sieg, U = Unentschieden, N = Niederlage"));
  if (isOwner) {
    const row = h("div", "owner-row"); row.append(h("span", null, "Deine Einschätzung:"));
    const cur = flynn[g.id];
    os.forEach((o) => { const b = h("button", "mini", "Setzen " + o.short); b.setAttribute("aria-pressed", String(cur?.typ === "setzen" && cur.k === o.k)); b.onclick = () => setFlynn(g.id, { typ: "setzen", k: o.k }); row.append(b); });
    const fwb = h("button", "mini", "Finger weg"); fwb.setAttribute("aria-pressed", String(cur?.typ === "finger")); fwb.onclick = () => setFlynn(g.id, { typ: "finger" }); row.append(fwb);
    if (cur) { const r = h("button", "mini", "Zurück zum Daten-Vorschlag"); r.onclick = () => setFlynn(g.id, null); row.append(r); }
    an.append(row);
  }
  more.onclick = () => { const o = more.getAttribute("aria-expanded") === "true"; more.setAttribute("aria-expanded", String(!o)); an.hidden = o; };
  el.append(head, h("div", "g-teams", g.h + " – " + g.a), bar, opts, vd, more, an);
  return el;
}

function renderList() {
  const box = $("#list"); box.replaceChildren();
  $("#onlyClear").parentElement.hidden = sport === "tennis";
  if (sport === "tennis") { box.append(h("div", "empty", "Für Tennis habe ich gerade keine Prognosen. Diese Woche laufen nur kleinere Turniere. Sobald grosse Turniere anstehen, ergänze ich sie.")); return; }
  let list = SPIELE.filter(passt).sort((a, b) => new Date(a.zeit) - new Date(b.zeit));
  const total = list.length;
  if (onlyClear) list = list.filter((g) => bestOf(g).p >= 60);
  $("#countInfo").textContent = list.length + (onlyClear ? " von " + total : "") + " Spiele";
  let day = "";
  list.forEach((g) => { const d = fmtDay.format(new Date(g.zeit)); if (d !== day) { day = d; box.append(h("div", "day", d)); } box.append(gameCard(g)); });
  if (sport !== "fussball") { const w = h("div", "warn"); w.style.marginTop = "1rem"; w.append(h("b", null, "Achtung bei Eishockey"), "Die Prozente gelten inklusive Verlängerung. Viele Wetten bei Sporttip zählen nur die 60 Minuten."); box.append(w); }
}

function renderBilanz() {
  const hb = $("#hist"); hb.replaceChildren();
  $("#histWrap").hidden = !BILANZ.length;
  if (!BILANZ.length) return;
  const t = BILANZ.filter((b) => b.treffer).length;
  hb.append(h("div", "sub", t + " von " + BILANZ.length + " Tipps getroffen (" + Math.round(t / BILANZ.length * 100) + " %)."));
  BILANZ.forEach((b) => { const d = h("div", "h"); d.append(h("span", null, b.spiel + ": " + b.tipp + " (" + b.resultat + ")"), h("span", b.treffer ? "ok" : "no", b.treffer ? "Treffer" : "Daneben")); hb.append(d); });
}

function renderTipps() { renderRitual(); tippDerWoche(); renderTeam(); renderEmpfehlungen(); renderList(); renderBilanz(); }

/* ================================================================
   Tippschein
   ================================================================ */
async function kopieren(legs, titel) {
  const lines = legs.map((s) => { const g = spiel(s.g); const o = out(g, s.k); return "• " + g.h + " – " + g.a + ": " + label(g, s.k) + " (" + num(o.q, 2) + ")"; });
  const q = legs.reduce((t, s) => t * out(spiel(s.g), s.k).q, 1);
  const text = (titel || "Mein Tippschein") + " – Tippkompass\n" + lines.join("\n") + "\nGesamtquote ca. " + num(q, 2) + " (bei Sporttip kann sie leicht abweichen)";
  try { await navigator.clipboard.writeText(text); toast("Kopiert"); gespielt.push({ ts: Date.now(), picks: legs.map((s) => ({ g: s.g, k: s.k, q: out(spiel(s.g), s.k).q })) }); gespielt = gespielt.slice(-200); store.set("gespielt", gespielt); speichern(); renderStatistik(); }
  catch { toast("Kopieren ging nicht."); }
}

function renderSchein() {
  const box = $("#slip"); box.replaceChildren();
  if (!schein.length) { box.append(h("div", "empty", "Noch leer. Wähl bei «Tipps» einen Tipp oder eine Kombi.")); renderMeineWetten(); return; }
  let q = 1, p = 1;
  schein.forEach((s) => {
    const g = spiel(s.g), o = out(g, s.k);
    q *= o.q; p *= o.p / 100;
    const it = h("div", "slip-item");
    const left = h("div"); left.append(h("div", "what", label(g, s.k) + (s.k === "u" ? "" : " gewinnt")), h("div", "vs", g.h + " – " + g.a + " · " + fmtShort.format(new Date(g.zeit))));
    const row = h("div", "row2"); const st = stufe(o.p);
    row.append(h("span", "stufe " + st.c, st.t), h("span", "vs", "Chance " + pct(o.p)));
    const e = einschaetzung(g);
    if (e && !e.auto) row.append(h("span", "tag " + (e.typ === "setzen" && e.k === s.k ? "good" : "bad"), e.typ === "setzen" && e.k === s.k ? "Wie mein Tipp" : e.typ === "finger" ? "Ich würde die Finger lassen" : "Ich tippe anders"));
    const x = h("button", "x", "Entfernen"); x.onclick = () => toggle(s.g, s.k); row.append(x);
    it.append(left, h("div", "p", num(o.q, 2)), row); box.append(it);
  });
  const sum = h("div", "sum");
  sum.append(h("div", "lbl", schein.length > 1 ? "Kombi aus " + schein.length + " Tipps · Gesamtquote" : "Quote"), h("div", "big", num(q, 2)));
  const meter = h("div", "meter"); const mi = h("i"); mi.style.width = (p * 100) + "%"; meter.append(mi);
  sum.append(meter, h("div", "lbl", "Chance, dass alles aufgeht: " + (p * 100).toFixed(p < .1 ? 1 : 0) + " %"));
  const rk = h("p", null, p >= .6 ? "Eher sicher." : p >= .35 ? "Mittleres Risiko." : "Hohes Risiko: Das geht meistens nicht auf.");
  sum.append(rk);
  const copy = h("button", "share", "Für Sporttip kopieren"); copy.onclick = () => kopieren(schein);
  sum.append(copy);
  // Setzen mit Spielgeld: eigenes Konto oder Gruppe
  const hatGruppe = !!(profil?.gruppe && gruppe);
  if (!hatGruppe) konto_ziel = "solo";
  const form = h("div", "stake");
  if (hatGruppe) {
    const sel = h("div", "ziel");
    [["solo", "Mein Spielgeld"], ["gruppe", "Gruppe «" + gruppe.name + "»"]].forEach(([v, t]) => { const b = h("button", null, t); b.setAttribute("aria-pressed", String(konto_ziel === v)); b.onclick = () => { konto_ziel = v; speichern(); renderSchein(); }; sel.append(b); });
    form.append(sel);
  }
  const zielGruppe = konto_ziel === "gruppe" && hatGruppe;
  const k = zielGruppe ? konto(wetten, gruppe.start) : konto(solo, SOLO_START);
  const frei = Math.max(0, Math.floor(k.stand * 100) / 100);
  const lab = h("label", null, (zielGruppe ? "In der Gruppe setzen" : "Mit Spielgeld setzen") + " · verfügbar " + fr(frei)); lab.htmlFor = "einsatz";
  const inp = h("input"); inp.id = "einsatz"; inp.type = "number"; inp.min = "1"; inp.step = "1"; inp.inputMode = "decimal"; inp.value = Math.min(10, Math.floor(frei));
  const gew = h("div", "lbl"); const upd = () => { gew.textContent = "Möglicher Gewinn: " + fr((parseFloat(inp.value) || 0) * q); }; inp.oninput = upd; upd();
  const btn = h("button", "place", zielGruppe ? "In «" + gruppe.name + "» setzen" : "Mit Spielgeld setzen");
  const ende = zielGruppe && gruppe.ende && new Date(gruppe.ende) < now;
  btn.disabled = frei < 1 || ende;
  if (ende) btn.textContent = "Die Runde ist vorbei";
  btn.onclick = () => {
    const e = Math.round((parseFloat(inp.value) || 0) * 100) / 100;
    if (e < 1) { inp.focus(); return; }
    if (e > frei) { toast("So viel hast du nicht mehr: " + fr(frei)); return; }
    const w = { id: "w" + Date.now(), ts: Date.now(), einsatz: e, picks: schein.map((s) => ({ g: s.g, k: s.k, q: out(spiel(s.g), s.k).q })) };
    (zielGruppe ? wetten : solo).push(w);
    schein = []; speichern(); renderAll(); toast("Gesetzt");
  };
  form.append(lab, inp, gew, btn);
  if (!zielGruppe && frei < 1 && !k.offen) { const r = h("button", "btn ghost", "Spielgeld neu starten (" + fr(SOLO_START) + ")"); r.onclick = () => { solo = []; speichern(); renderAll(); toast("Neues Spielgeld"); }; form.append(r); }
  const nur = h("button", "btn ghost", "Nur tippen, ohne Einsatz"); nur.style.marginTop = ".5rem";
  nur.onclick = () => { gespielt.push({ ts: Date.now(), picks: schein.map((s) => ({ g: s.g, k: s.k, q: out(spiel(s.g), s.k).q })) }); schein = []; speichern(); renderAll(); toast("Getippt"); };
  form.append(nur);
  sum.append(form);
  box.append(sum);
  renderMeineWetten();
}

function renderMeineWetten() {
  const box = $("#wetten"); box.replaceChildren();
  $("#wettenWrap").hidden = !solo.length && !wetten.length;
  const k = konto(solo, SOLO_START);
  if (solo.length || !profil?.gruppe) {
    const kh = h("div", "kontoline"); kh.append(h("span", null, "Mein Spielgeld"), h("b", null, fr(k.stand)), h("small", null, (k.gewinn >= 0 ? "+" : "−") + fr(Math.abs(k.gewinn)) + " seit Start mit " + fr(SOLO_START)));
    box.append(kh);
    solo.slice().sort((a, b) => b.ts - a.ts).forEach((w) => box.append(wettKarte(w)));
  }
  if (wetten.length) { box.append(h("h3", null, "In der Gruppe")); wetten.slice().sort((a, b) => b.ts - a.ts).forEach((w) => box.append(wettKarte(w))); }
}
function wettKarte(w) {
  const st = status(w), q = wQuote(w);
  const el = h("div", "bet " + st);
  const top = h("div", "bet-top");
  top.append(h("b", null, (w.picks.length > 1 ? "Kombi · " : "") + fr(w.einsatz) + " auf " + num(q, 2)), h("span", "st " + st, st === "offen" ? "Offen" : st === "gewonnen" ? "+" + fr(w.einsatz * q - w.einsatz) : "−" + fr(w.einsatz)));
  el.append(top);
  w.picks.forEach((p) => { const g = spiel(p.g); if (g) el.append(h("div", "vs", (g.res ? (g.res === p.k ? "✓ " : "✗ ") : "· ") + label(g, p.k) + " (" + g.h + " – " + g.a + ")")); });
  return el;
}

/* ================================================================
   Gruppe
   ================================================================ */
function renderGruppe() {
  const box = $("#gruppeBox"); box.replaceChildren();
  if (!profil?.gruppe || !gruppe) {
    const c = h("div", "card");
    c.append(h("h3", null, "Mit Kollegen tippen"), h("p", "sub", "Erstell eine Gruppe und leg fest, mit wie viel Geld jeder startet. Ihr tippt mit diesem Startgeld in der App, und am Ende seht ihr, wer am meisten hat. Echtes Geld wird in der App nicht eingesetzt."));
    const b1 = h("button", "btn", "Gruppe erstellen"); b1.onclick = () => openOnb(4);
    const b2 = h("button", "btn ghost", "Mit Code beitreten"); b2.style.marginTop = ".5rem"; b2.onclick = () => openOnb(5);
    c.append(b1, b2); box.append(c); return;
  }
  const ende = gruppe.ende ? new Date(gruppe.ende) : null;
  const vorbei = ende && ende < now;
  const head = h("div", "g-hero");
  head.append(h("div", "lbl", "Gruppe"), h("div", "gname", gruppe.name), h("div", "lbl", "Startgeld " + fr(gruppe.start) + " pro Person" + (ende ? " · " + (vorbei ? "beendet am " : "läuft bis ") + fmtDate.format(ende) : "")));
  const code = h("div", "code"); code.append(h("span", null, "Einladungscode"), h("b", null, profil.gruppe));
  head.append(code);
  box.append(head);

  const alle = [{ id: me || "ich", nick: profil.nick, wetten, ich: true }, ...mitglieder.filter((m) => m.gruppe === profil.gruppe && m.id !== me)];
  const rows = alle.map((m) => ({ ...m, k: konto(m.wetten || [], gruppe.start) })).sort((a, b) => b.k.stand - a.k.stand);
  if (vorbei && rows.length) { const w = h("div", "winner"); w.append(h("span", null, "Sieger"), h("b", null, rows[0].nick + " gewinnt mit " + fr(rows[0].k.stand))); box.append(w); }
  box.append(rueckblick(rows));
  const tt = titel(rows);
  box.append(h("h3", "sec", "Rangliste"));
  const ol = h("ol", "rank2");
  rows.forEach((m, i) => {
    const li = h("li", m.ich ? "me" : "");
    const btn = h("button", "rk");
    btn.setAttribute("aria-expanded", String(offenMitglied === m.id));
    const nm = h("span", "nm"); nm.append(h("span", null, m.nick + (m.ich ? " (du)" : "")));
    if (tt[m.id]) { const ts = h("span", "titles"); tt[m.id].forEach((x) => ts.append(h("small", null, x))); nm.append(ts); }
    btn.append(h("span", "pos", String(i + 1)), nm);
    const right = h("span", "rk-r"); right.append(h("b", null, fr(m.k.stand)), h("small", m.k.gewinn >= 0 ? "pos" : "neg", (m.k.gewinn >= 0 ? "+" : "−") + fr(Math.abs(m.k.gewinn)) + " gewonnen"));
    btn.append(right);
    btn.onclick = () => { offenMitglied = offenMitglied === m.id ? null : m.id; renderGruppe(); };
    li.append(btn);
    if (offenMitglied === m.id) {
      const d = h("div", "rk-detail");
      d.append(h("div", "sub", m.k.treffer + " von " + m.k.fertig + " Wetten getroffen · " + m.k.offen + " offen · " + fr(m.k.einsatzOffen) + " im Spiel"));
      (m.wetten || []).slice().sort((a, b) => b.ts - a.ts).forEach((w) => d.append(wettKarte(w)));
      if (!(m.wetten || []).length) d.append(h("div", "sub", "Noch keine Wetten."));
      li.append(d);
    }
    ol.append(li);
  });
  box.append(ol);
  box.append(h("h3", "sec", "Deine Abzeichen"));
  const ab = h("div", "badges");
  abzeichen(wetten).forEach((a) => { const d = h("div", "bdg" + (a.ok ? " ok" : "")); d.append(h("span", "bdg-ic", a.ic), h("b", null, a.t), h("small", null, a.d)); ab.append(d); });
  box.append(ab, h("p", "sub", "Abzeichen gibt es nur für richtige Tipps, nie dafür, wie viel du setzt."));
  if (rows.length < 2) box.append(h("p", "sub", "Schick deinen Kollegen den Link zur App und den Code " + profil.gruppe + ", dann erscheinen sie hier."));
}

/* ================================================================
   Profil
   ================================================================ */
function renderProfil() {
  const box = $("#profilBox"); box.replaceChildren();
  if (!profil) return;
  const c = h("div", "card"); c.append(h("h3", null, "Dein Profil"));
  const f = h("div", "field"); const l = h("label", null, "Spielername"); l.htmlFor = "nick"; const i = h("input"); i.id = "nick"; i.value = profil.nick; i.maxLength = 20;
  i.onchange = () => { profil.nick = i.value.trim().slice(0, 20) || profil.nick; speichern(); renderGruppe(); };
  f.append(l, i); c.append(f);
  const tf = h("div", "field"); const tl = h("label", null, "Lieblingsteam"); tl.htmlFor = "team";
  const sel = h("select"); sel.id = "team"; sel.append(new Option("Kein Lieblingsteam", ""));
  alleTeams().forEach((t) => sel.append(new Option(t, t))); sel.value = team;
  sel.onchange = () => { team = sel.value; store.set("team", team); speichern(); renderTipps(); toast(team ? "Spiele von " + team + " stehen jetzt oben." : "Lieblingsteam entfernt."); };
  tf.append(tl, sel); c.append(tf);
  if (profil.gruppe) {
    const lv = h("button", "btn ghost", "Gruppe verlassen");
    lv.onclick = () => { if (lv.dataset.ok) { profil.gruppe = null; gruppe = null; wetten = []; speichern(); renderAll(); } else { lv.dataset.ok = "1"; lv.textContent = "Sicher? Deine Gruppen-Wetten gehen verloren. Nochmals tippen."; } };
    c.append(lv);
  }
  box.append(c);
  const ac = h("div", "card"); ac.append(h("h3", null, "Konto"));
  if (authUser) {
    ac.append(h("p", "sub", "Angemeldet als " + (authUser.email || "Google-Konto") + ". Dein Spielstand ist online gesichert und auf jedem Gerät da."));
    const out = h("button", "btn ghost", "Abmelden"); out.onclick = async () => { await fb.logout(); toast("Abgemeldet"); };
    const del = h("button", "btn ghost", "Konto löschen"); del.style.marginTop = ".5rem";
    del.onclick = async () => {
      if (!del.dataset.ok) { del.dataset.ok = "1"; del.textContent = "Wirklich? Konto und Spielstand werden gelöscht. Nochmals tippen."; return; }
      try { await db.doc("players/" + me).remove(); await fb.deleteMe(); profil = null; wetten = []; solo = []; gespielt = []; speichern(); openOnb(1); renderAll(); toast("Konto gelöscht"); }
      catch (e) { toast((e && e.code || "").includes("recent-login") ? "Melde dich kurz ab und wieder an, dann nochmals löschen." : "Löschen hat nicht geklappt."); }
    };
    ac.append(out, del);
  } else {
    ac.append(h("p", "sub", "Du bist nicht angemeldet. Dein Spielstand ist nur auf diesem Gerät gespeichert."));
    const li = h("button", "btn", "Anmelden oder Konto erstellen"); li.onclick = () => openOnb(0); ac.append(li);
  }
  box.append(ac);
  const info = h("div", "card");
  info.append(h("h3", null, "So nutzt du Tippkompass"));
  const ol = h("ol", "steps");
  ["Schau dir an, worauf ich setzen würde und wovon ich die Finger lasse.", "Wähl oben, ob du sicher oder mutiger spielen willst.", "Kopier den Tipp oder die Kombi und setz selbst bei Sporttip, wenn du echtes Geld einsetzen willst.", "Oder tipp mit deinen Kollegen in einer Gruppe mit Startgeld."].forEach((t) => ol.append(h("li", null, t)));
  info.append(ol, h("p", "sub", "Tippkompass ist eine Tipp-Hilfe. In der App wird kein echtes Geld gesetzt. Nicht mit Swisslos verbunden."));
  box.append(info);
  const help = h("div", "help");
  help.append(h("b", null, "Wird es zu viel? "), "SOS-Spielsucht hilft gratis und anonym, rund um die Uhr: Helpline ", h("b", null, "0800 040 080"), " oder ");
  const a = h("a", null, "sos-spielsucht.ch"); a.href = "https://www.sos-spielsucht.ch"; help.append(a, ".");
  box.append(help);
  const reset = h("button", "x", "Alles zurücksetzen"); reset.style.marginTop = "1rem";
  reset.onclick = () => { if (reset.dataset.ok) { profil = null; wetten = []; solo = []; gespielt = []; schein = []; gruppe = null; speichern(); openOnb(1); renderAll(); } else { reset.dataset.ok = "1"; reset.textContent = "Wirklich alles löschen? Nochmals tippen."; } };
  box.append(reset);
}

/* ================================================================
   Einstieg
   ================================================================ */
let draft = {};
function openOnb(step) { $("#onb").hidden = false; showStep(step); }
function showStep(n) {
  document.querySelectorAll(".step").forEach((s) => (s.hidden = s.dataset.step !== String(n)));
  const f = document.querySelector('.step[data-step="' + n + '"] input, .step[data-step="' + n + '"] button'); if (f) f.focus();
}
let gruppeNachLogin = null;
$("#s1next").onclick = () => showStep(me ? 2 : 0);
$("#s2next").onclick = () => { const n = $("#onbNick").value.trim(); if (!n) { $("#onbNick").focus(); return; } draft.nick = n.slice(0, 20); showStep(3); };
$("#chTipps").onclick = () => finish(null);
$("#chCreate").onclick = () => { if (!me) { gruppeNachLogin = 4; toast("Für Gruppen brauchst du ein Konto"); showStep(0); return; } showStep(4); };
$("#chJoin").onclick = () => { if (!me) { gruppeNachLogin = 5; toast("Für Gruppen brauchst du ein Konto"); showStep(0); return; } showStep(5); };
document.querySelectorAll(".back").forEach((b) => (b.onclick = () => (profil ? ($("#onb").hidden = true) : showStep(3))));
document.querySelectorAll(".chip-opt").forEach((b) => (b.onclick = () => {
  b.parentElement.querySelectorAll(".chip-opt").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
}));
$("#createGroup").onclick = async () => {
  const name = $("#gName").value.trim() || "Unsere Runde";
  const start = parseFloat(document.querySelector('#gStart .chip-opt[aria-pressed="true"]').dataset.v);
  const wochen = parseFloat(document.querySelector('#gDauer .chip-opt[aria-pressed="true"]').dataset.v);
  const ende = new Date(now.getTime() + wochen * 7 * 864e5).toISOString();
  const code = Math.random().toString(36).slice(2, 8).toUpperCase();
  gruppe = { name, start, ende };
  store.set("gruppe_" + code, gruppe);
  if (db) { try { await db.doc("groups/" + code).set({ ...gruppe, by: me, at: Date.now() }); } catch { toast("Gruppe konnte nicht gespeichert werden."); } }
  finish(code);
};
$("#joinGroup").onclick = async () => {
  const code = $("#gCode").value.trim().toUpperCase();
  if (code.length < 4) { $("#gCode").focus(); return; }
  let g = store.get("gruppe_" + code, null);
  if (db) { try { const x = await db.doc("groups/" + code).get(); if (x && x.name) g = { name: x.name, start: x.start || 100, ende: x.ende || null }; } catch {} }
  if (!g) { toast("Diesen Code gibt es nicht."); return; }
  gruppe = g; finish(code);
};
/* ---------- Anmeldung ---------- */
function fehlerText(e) {
  const c = (e && e.code) || "";
  if (c.includes("invalid-credential") || c.includes("wrong-password") || c.includes("user-not-found")) return "E-Mail oder Passwort stimmt nicht.";
  if (c.includes("email-already-in-use")) return "Mit dieser E-Mail gibt es schon ein Konto. Melde dich an.";
  if (c.includes("weak-password")) return "Das Passwort braucht mindestens 6 Zeichen.";
  if (c.includes("invalid-email")) return "Diese E-Mail-Adresse stimmt nicht.";
  if (c.includes("popup")) return "Das Google-Fenster wurde geschlossen oder blockiert.";
  if (c.includes("network")) return "Keine Verbindung zum Internet.";
  if (c.includes("too-many-requests")) return "Zu viele Versuche. Warte kurz.";
  return "Das hat nicht geklappt. Versuch es nochmals.";
}
async function nachLogin() {
  // warten bis onAuth den Spielstand geladen hat
  setTimeout(() => {
    if ($("#onb").hidden) return;
    if (gruppeNachLogin) { showStep(gruppeNachLogin); gruppeNachLogin = null; } else if (!profil) showStep(draft.nick ? 3 : 2); else $("#onb").hidden = true;
  }, 900);
}
function loginBinden() {
  const msg = $("#authMsg"); const say = (t) => { msg.textContent = t; msg.hidden = !t; };
  $("#authGoogle").onclick = async () => { if (!fb) return say("Anmeldung ist gerade nicht erreichbar."); say(""); try { await fb.google(); nachLogin(); } catch (e) { say(fehlerText(e)); } };
  $("#authLogin").onclick = async () => { if (!fb) return say("Anmeldung ist gerade nicht erreichbar."); say(""); try { await fb.login($("#authMail").value.trim(), $("#authPw").value); nachLogin(); } catch (e) { say(fehlerText(e)); } };
  $("#authNew").onclick = async () => { if (!fb) return say("Anmeldung ist gerade nicht erreichbar."); say(""); try { await fb.register($("#authMail").value.trim(), $("#authPw").value); nachLogin(); } catch (e) { say(fehlerText(e)); } };
  $("#authReset").onclick = async () => { const m = $("#authMail").value.trim(); if (!m) { say("Gib zuerst deine E-Mail ein."); $("#authMail").focus(); return; } try { await fb.reset(m); say("Wir haben dir eine E-Mail zum Zurücksetzen geschickt."); } catch (e) { say(fehlerText(e)); } };
  $("#authSkip").onclick = () => { gruppeNachLogin = null; if (profil) $("#onb").hidden = true; else showStep(draft.nick ? 3 : 2); };
}
loginBinden();

function finish(code) {
  const neueGruppe = code && code !== profil?.gruppe;
  profil = { ...(profil || {}), adult: true, nick: draft.nick || profil?.nick || "Spieler", gruppe: code || profil?.gruppe || null };
  if (neueGruppe) wetten = [];
  speichern(); $("#onb").hidden = true; renderAll(); gruppeLaden();
  if (code) { go("gruppe"); toast("Willkommen in «" + gruppe.name + "»!"); }
}

/* ================================================================
   Datenbank: Gruppe und eigene Tipps teilen
   ================================================================ */
let syncT;
function speichern() { store.set("profil3", profil); store.set("wetten3", wetten); store.set("solo", solo); store.set("konto_ziel", konto_ziel); store.set("risiko", risiko); clearTimeout(syncT); syncT = setTimeout(sync, 500); }
async function sync() {
  if (!db || !me || !profil) return;
  try { await db.doc("players/" + me).set({ nick: profil.nick, gruppe: profil.gruppe || null, wetten, votes, team, gespielt, solo, at: Date.now() }); } catch (e) { console.warn(e); }
}
async function setFlynn(id, val) {
  if (val) flynn[id] = val; else delete flynn[id];
  renderAll();
  if (db) { try { await db.doc("meta/flynn").set({ picks: flynn, at: Date.now() }); toast("Gespeichert"); } catch { toast("Konnte nicht gespeichert werden."); } }
}
function wiederherstellen(x) {
  if (!x) return false;
  if (x.nick) profil = { adult: true, nick: x.nick, gruppe: x.gruppe || null };
  if (Array.isArray(x.wetten)) wetten = x.wetten;
  if (Array.isArray(x.solo)) solo = x.solo;
  if (Array.isArray(x.gespielt)) gespielt = x.gespielt;
  if (x.votes) votes = x.votes;
  if (typeof x.team === "string") team = x.team;
  store.set("profil3", profil); store.set("wetten3", wetten); store.set("solo", solo); store.set("gespielt", gespielt); store.set("votes", votes); store.set("team", team);
  return !!x.nick;
}
let unsubs = [];
async function gruppeLaden() {
  unsubs.forEach((u) => { try { u(); } catch {} }); unsubs = [];
  mitglieder = [];
  if (!db || !me || !profil?.gruppe) { renderGruppe(); return; }
  try { const x = await db.doc("groups/" + profil.gruppe).get(); if (x && x.name) { gruppe = { name: x.name, start: x.start || 100, ende: x.ende || null }; store.set("gruppe_" + profil.gruppe, gruppe); } } catch {}
  try { unsubs.push(db.mitglieder(profil.gruppe, (list) => { mitglieder = list; renderGruppe(); renderStatistik(); tippDerWoche(); })); } catch {}
}
async function initDb() {
  fb = await (window.tkFirebase || Promise.resolve(null));
  if (!fb) return;
  db = fb.db;
  try { db.doc("meta/flynn").onSnapshot((x) => { flynn = (x && x.picks) || {}; renderTipps(); }); } catch {}
  fb.onAuth(async (u) => {
    authUser = u; me = u ? u.uid : null;
    isOwner = !!(u && u.email && OWNER_EMAILS.includes(u.email.toLowerCase()));
    if (!u) { unsubs.forEach((f) => { try { f(); } catch {} }); unsubs = []; mitglieder = []; renderAll(); return; }
    let x = null; try { x = await db.doc("players/" + me).get(); } catch {}
    if (x && x.nick) { wiederherstellen(x); if (!gruppeNachLogin) $("#onb").hidden = true; toast("Spielstand geladen"); }
    else if (profil) { sync(); }
    await gruppeLaden(); renderAll();
  });
}
/* ================================================================
   Navigation
   ================================================================ */
let tt;
function toast(msg) { const t = $("#toast"); t.textContent = msg; t.classList.add("show"); clearTimeout(tt); tt = setTimeout(() => t.classList.remove("show"), 2400); }
function badge() { const c = $("#slipCount"); c.textContent = schein.length; c.hidden = !schein.length; }
function go(view) {
  document.querySelectorAll(".tabs button").forEach((x) => x.setAttribute("aria-selected", String(x.dataset.view === view)));
  ["tipps", "schein", "statistik", "gruppe", "profil"].forEach((v) => { $("#v-" + v).hidden = v !== view; });
  window.scrollTo({ top: 0 });
}
document.querySelectorAll(".tabs button").forEach((b) => (b.onclick = () => go(b.dataset.view)));
document.querySelectorAll(".sports button").forEach((b) => (b.onclick = () => {
  sport = b.dataset.sport;
  document.querySelectorAll(".sports button").forEach((x) => x.setAttribute("aria-pressed", String(x === b)));
  renderTipps();
}));
document.querySelectorAll(".risk button").forEach((b) => {
  b.setAttribute("aria-pressed", String(b.dataset.r === risiko));
  b.onclick = () => { risiko = b.dataset.r; document.querySelectorAll(".risk button").forEach((x) => x.setAttribute("aria-pressed", String(x === b))); speichern(); renderEmpfehlungen(); };
});
const sw = $("#onlyClear"); sw.setAttribute("aria-pressed", String(onlyClear));
sw.onclick = () => { onlyClear = !onlyClear; store.set("onlyClear", onlyClear); sw.setAttribute("aria-pressed", String(onlyClear)); renderList(); };
$("#allToggle").onclick = () => { const o = $("#allToggle").getAttribute("aria-expanded") === "true"; $("#allToggle").setAttribute("aria-expanded", String(!o)); $("#allWrap").hidden = o; };
function zeigeStand() { (function stale() { const hrs = (now - new Date(STAND)) / 36e5; if (hrs > 24) { const el = $("#stale"); el.hidden = false; el.textContent = "Die Tipps sind " + Math.floor(hrs / 24) + " Tag(e) alt. Bald kommt ein Update."; } })();
$("#stand").textContent = "Stand: " + new Intl.DateTimeFormat("de-CH", { day: "numeric", month: "long", hour: "2-digit", minute: "2-digit", timeZone: tz }).format(new Date(STAND)); }
zeigeStand();
if (profil?.gruppe) gruppe = store.get("gruppe_" + profil.gruppe, null);

/* ---------- Statistik für Tipper ---------- */
function allePicks(liste) {
  // liste: [{ts, picks, einsatz?}] -> einzelne Tipps mit Ergebnis
  const r = [];
  liste.forEach((w) => w.picks.forEach((p) => { const g = spiel(p.g); r.push({ ...p, ts: w.ts, g0: g, res: g?.res ? (g.res === p.k ? "ok" : "falsch") : "offen", p: g ? out(g, p.k).p : null, liga: g?.liga || "?" }); }));
  return r;
}
function trefferquote(ps) { const e = ps.filter((x) => x.res !== "offen"); return e.length ? e.filter((x) => x.res === "ok").length / e.length * 100 : null; }
function renderStatistik() {
  const box = $("#statistik"); if (!box) return; box.replaceChildren();
  const ps = allePicks([...wetten, ...solo, ...gespielt]);
  const entschieden = ps.filter((x) => x.res !== "offen");
  const tq = trefferquote(ps);
  // Kopfzahl
  const hero = h("div", "st-hero");
  hero.append(h("span", null, "Deine Trefferquote"), h("b", null, tq == null ? "–" : Math.round(tq) + " %"), h("small", null, entschieden.length ? entschieden.filter((x) => x.res === "ok").length + " von " + entschieden.length + " Tipps richtig" : "Noch kein Tipp entschieden. Setz im Tippschein mit Spielgeld oder tipp ohne Einsatz."));
  box.append(hero);
  if (!ps.length) return;
  const grid = h("div", "st-grid");
  const kach = (l, v, s) => { const d = h("div", "st-k"); d.append(h("span", null, l), h("b", null, v), s ? h("small", null, s) : ""); grid.append(d); };
  const erw = ps.filter((x) => x.p != null); const erwQ = erw.length ? erw.reduce((t, x) => t + x.p, 0) / erw.length : null;
  kach("Erwartet", erwQ == null ? "–" : Math.round(erwQ) + " %", "So viele Treffer wären laut Statistik normal");
  kach("Gespielte Tipps", String(ps.length), ps.length - entschieden.length + " noch offen");
  // Serie
  let serie = 0, best = 0; entschieden.sort((a, b) => a.ts - b.ts).forEach((x) => { serie = x.res === "ok" ? serie + 1 : 0; best = Math.max(best, serie); });
  let akt = 0; for (const x of [...entschieden].reverse()) { if (x.res === "ok") akt++; else break; }
  kach("Aktuelle Serie", String(akt), "Längste Serie: " + best);
  const hq = entschieden.filter((x) => x.res === "ok").sort((a, b) => b.q - a.q)[0];
  kach("Höchste Quote getroffen", hq ? num(hq.q, 2) : "–", hq?.g0 ? label(hq.g0, hq.k) : "");
  // Spielgeld
  const ks = konto(solo, SOLO_START);
  if (solo.length) kach("Mein Spielgeld", fr(ks.stand), (ks.gewinn >= 0 ? "+" : "−") + fr(Math.abs(ks.gewinn)) + " seit Start");
  const fertig = wetten.filter((w) => status(w) !== "offen");
  if (fertig.length) { const plus = fertig.reduce((t, w) => t + (status(w) === "gewonnen" ? w.einsatz * wQuote(w) - w.einsatz : -w.einsatz), 0); kach("Gruppe: Plus/Minus", (plus >= 0 ? "+" : "−") + fr(Math.abs(plus)), fertig.length + " Wetten abgerechnet"); }
  // Kombis
  const kombis = [...wetten, ...solo, ...gespielt].filter((w) => w.picks.length > 1);
  if (kombis.length) { const kok = kombis.filter((w) => status(w) === "gewonnen").length; kach("Kombis gewonnen", kok + " von " + kombis.filter((w) => status(w) !== "offen").length, kombis.length + (kombis.length === 1 ? " Kombi" : " Kombis") + " gespielt"); }
  box.append(grid);
  // Nach Stufe
  const stufen = [["Sicher", (p) => p >= 70], ["Mittel", (p) => p >= 55 && p < 70], ["Riskant", (p) => p < 55]];
  const sec = h("div", "st-sec"); sec.append(h("h3", null, "Treffer nach Risiko"));
  stufen.forEach(([n, f]) => {
    const s = ps.filter((x) => x.p != null && f(x.p)); const q = trefferquote(s);
    const row = h("div", "st-bar"); const bar = h("i"); bar.style.width = (q || 0) + "%";
    const track = h("div", "st-track"); track.append(bar);
    row.append(h("span", null, n), track, h("b", null, q == null ? (s.length ? "offen" : "–") : Math.round(q) + " %"));
    sec.append(row);
  });
  box.append(sec);
  // Lieblingsliga
  const ligen = {}; ps.forEach((x) => (ligen[x.liga] = (ligen[x.liga] || 0) + 1));
  const lsec = h("div", "st-sec"); lsec.append(h("h3", null, "Deine Ligen"));
  Object.entries(ligen).sort((a, b) => b[1] - a[1]).forEach(([l, n]) => { const q = trefferquote(ps.filter((x) => x.liga === l)); const r = h("div", "st-row"); r.append(h("span", null, l), h("span", null, n + (n === 1 ? " Tipp" : " Tipps")), h("b", null, q == null ? "–" : Math.round(q) + " %")); lsec.append(r); });
  box.append(lsec);
  // Vergleich mit meinen Tipps
  const mitMir = ps.filter((x) => { const e = x.g0 && einschaetzung(x.g0); return e && e.typ === "setzen" && e.k === x.k; });
  const ohne = ps.filter((x) => !mitMir.includes(x));
  const vsec = h("div", "st-sec"); vsec.append(h("h3", null, "Meinen Tipps gefolgt?"));
  [["Gleich wie mein Tipp", mitMir], ["Eigene Wahl", ohne]].forEach(([l, arr]) => { const q = trefferquote(arr); const r = h("div", "st-row"); r.append(h("span", null, l), h("span", null, arr.length + (arr.length === 1 ? " Tipp" : " Tipps")), h("b", null, q == null ? "–" : Math.round(q) + " %")); vsec.append(r); });
  box.append(vsec);
  // Gruppe
  if (mitglieder.length) {
    const gsec = h("div", "st-sec"); gsec.append(h("h3", null, "Trefferquote in der Gruppe"));
    const alle = [{ nick: (profil?.nick || "Du") + " (du)", q: tq }, ...mitglieder.filter((m) => m.id !== me).map((m) => ({ nick: m.nick, q: trefferquote(allePicks([...(m.wetten || []), ...(m.solo || []), ...(m.gespielt || [])])) }))].sort((a, b) => (b.q ?? -1) - (a.q ?? -1));
    alle.forEach((m, i) => { const r = h("div", "st-row"); r.append(h("span", null, (i + 1) + ". " + m.nick), h("span", null, ""), h("b", null, m.q == null ? "–" : Math.round(m.q) + " %")); gsec.append(r); });
    box.append(gsec);
  }
  box.append(h("p", "sub", "Zählt alle Tipps, die du getippt, mit Spielgeld gesetzt oder für Sporttip kopiert hast. Langfristig gewinnt bei Wetten fast immer der Anbieter."));
}

function renderAll() { renderTipps(); renderSchein(); renderStatistik(); renderGruppe(); renderProfil(); badge(); }
if (!profil) openOnb(1);
renderAll();
initDb();
(async function datenLaden() {
  try {
    const r = await fetch("data.json?t=" + Date.now(), { cache: "no-store" });
    if (!r.ok) return;
    const d = await r.json();
    if (!d || !Array.isArray(d.SPIELE)) return;
    STAND = d.STAND || STAND; SPIELE = d.SPIELE; TOPS = d.TOPS || []; RESULTATE = d.RESULTATE || []; if (d.TIPP_DER_WOCHE) TIPP_DER_WOCHE = d.TIPP_DER_WOCHE;
    zeigeStand(); renderAll();
  } catch {}
})();
if ("serviceWorker" in navigator) { try { navigator.serviceWorker.register("sw.js"); } catch {} }
