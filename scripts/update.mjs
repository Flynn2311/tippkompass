// Tippkompass: automatisches Daten-Update (läuft auf GitHub Actions)
// - Resultate alle 30 Min von ESPN (gratis, ohne Schlüssel)
// - Quoten ca. 3x täglich von The Odds API (Schlüssel als Secret ODDS_API_KEY)
import fs from "node:fs";

const FILE = new URL("../data.json", import.meta.url);
const KEY = process.env.ODDS_API_KEY || "";
const FORCE = process.env.FORCE_ODDS === "true";
const MOCK = process.env.MOCK_DIR || "";
const now = new Date(process.env.NOW || Date.now());
const H = 36e5, D = 24 * H;

const LIGEN = [
  { liga: "Super League", odds: "soccer_switzerland_superleague", espn: "soccer/sui.1" },
  { liga: "Premier League", odds: "soccer_epl", espn: "soccer/eng.1" },
  { liga: "Bundesliga", odds: "soccer_germany_bundesliga", espn: "soccer/ger.1" },
  { liga: "Champions League", odds: "soccer_uefa_champs_league", espn: "soccer/uefa.champions" },
];
const NUR_RESULTATE = [{ liga: "NHL", espn: "hockey/nhl" }]; // alte NHL-Spiele noch abrechnen
// Tennis: nur grosse ATP-Turniere, wenn gerade eins läuft
const TENNIS_RANG = [/finals/i, /aus.*open|australian/i, /french|roland/i, /wimbledon/i, /us_open|us open/i, /indian_wells|miami|monte|madrid|italian|rome|canad|cincinnati|shanghai|paris/i];

// Anzeigenamen wie bisher in der App
const NAMEN = {
  "bayern munich": "Bayern München", "fc bayern munchen": "Bayern München", "bayern munchen": "Bayern München",
  "fc cologne": "1. FC Köln", "1. fc cologne": "1. FC Köln", "1. fc koln": "1. FC Köln", "fc koln": "1. FC Köln",
  "borussia monchengladbach": "Gladbach", "borussia mgladbach": "Gladbach", "monchengladbach": "Gladbach",
  "mainz 05": "FSV Mainz", "1. fsv mainz 05": "FSV Mainz", "fsv mainz": "FSV Mainz", "fsv mainz 05": "FSV Mainz",
  "sc paderborn 07": "SC Paderborn", "fc augsburg": "FC Augsburg", "augsburg": "FC Augsburg",
  "sv werder bremen": "Werder Bremen", "1. fc union berlin": "Union Berlin", "union berlin": "Union Berlin",
  "tsg 1899 hoffenheim": "TSG Hoffenheim", "tsg hoffenheim": "TSG Hoffenheim", "hoffenheim": "TSG Hoffenheim",
  "fc schalke 04": "Schalke 04", "sv 07 elversberg": "SV Elversberg", "sv elversberg": "SV Elversberg",
  "vfb stuttgart": "VfB Stuttgart", "sc freiburg": "SC Freiburg", "rb leipzig": "RB Leipzig", "rasenballsport leipzig": "RB Leipzig",
  "hamburger sv": "Hamburger SV", "hamburg sv": "Hamburger SV", "eintracht frankfurt": "Eintracht Frankfurt",
  "vfl wolfsburg": "VfL Wolfsburg", "wolfsburg": "VfL Wolfsburg", "1. fc heidenheim": "Heidenheim", "fc st. pauli": "St. Pauli", "st. pauli": "St. Pauli",
  "brighton and hove albion": "Brighton", "brighton & hove albion": "Brighton", "tottenham hotspur": "Tottenham",
  "newcastle united": "Newcastle", "afc bournemouth": "Bournemouth", "wolverhampton wanderers": "Wolves",
  "west ham united": "West Ham", "nottingham forest": "Nottingham Forest", "manchester united": "Manchester United", "manchester city": "Manchester City",
  "bsc young boys": "Young Boys", "young boys": "Young Boys", "fc zurich": "FC Zürich", "zurich": "FC Zürich",
  "grasshopper club zurich": "GC Zürich", "grasshoppers": "GC Zürich", "grasshopper": "GC Zürich",
  "fc st. gallen 1879": "FC St. Gallen", "fc st. gallen": "FC St. Gallen", "st. gallen": "FC St. Gallen", "st gallen": "FC St. Gallen",
  "servette fc": "Servette", "servette": "Servette", "fc lausanne-sport": "Lausanne-Sport", "lausanne sport": "Lausanne-Sport", "lausanne": "Lausanne-Sport",
  "fc luzern": "FC Luzern", "luzern": "FC Luzern", "fc lugano": "FC Lugano", "lugano": "FC Lugano", "fc sion": "FC Sion", "sion": "FC Sion",
  "fc basel": "FC Basel", "fc basel 1893": "FC Basel", "basel": "FC Basel", "fc winterthur": "FC Winterthur", "winterthur": "FC Winterthur",
  "fc thun": "FC Thun", "thun": "FC Thun", "fc vaduz": "FC Vaduz",
  "real madrid": "Real Madrid", "barcelona": "FC Barcelona", "fc barcelona": "FC Barcelona", "inter milan": "Inter Mailand", "internazionale": "Inter Mailand",
  "ac milan": "AC Mailand", "juventus": "Juventus", "paris saint germain": "Paris SG", "paris saint-germain": "Paris SG", "napoli": "SSC Napoli", "ssc napoli": "SSC Napoli",
  "atletico madrid": "Atlético Madrid", "real betis": "Real Betis", "real betis seville": "Real Betis", "aek athens": "AEK Athen", "galatasaray": "Galatasaray",
};
const ohneAkzent = (s) => s.normalize("NFD").replace(/[̀-ͯ]/g, "");
function anzeige(name) {
  const k = ohneAkzent(String(name)).toLowerCase().trim();
  if (NAMEN[k]) return NAMEN[k];
  return String(name).replace(/^AFC\s+/, "").replace(/\s+(FC|AFC|CF)$/, "").trim();
}
// Vergleichsschlüssel: robust gegen "FC", Akzente, englische Stadtnamen
const STOP = new Set(["fc", "sc", "afc", "cf", "ac", "sv", "1", "fsv", "tsg", "bsc", "club", "de", "and", "the", "1879", "1893", "1899", "05", "04", "07", "hove", "albion", "hotspur", "calcio"]);
const ALIAS = { munich: "munchen", cologne: "koln", mgladbach: "gladbach", monchengladbach: "gladbach", grasshopper: "gc", grasshoppers: "gc", milan: "mailand", internazionale: "inter", athens: "athen", seville: "betis" };
function tokens(name) {
  return new Set(ohneAkzent(anzeige(name) + " " + name).toLowerCase().replace(/[^a-z0-9 ]/g, " ").split(/\s+/).filter((t) => t && !STOP.has(t)).map((t) => ALIAS[t] || t));
}
function aehnlich(a, b) {
  const A = tokens(a), B = tokens(b); let n = 0; A.forEach((t) => B.has(t) && n++);
  return n / Math.max(1, Math.min(A.size, B.size));
}
function finde(spiele, h, a, zeit, maxStd = 6) {
  let best = null, bs = 0; const t = new Date(zeit).getTime();
  for (const g of spiele) {
    if (Math.abs(new Date(g.zeit).getTime() - t) > maxStd * H) continue;
    const sh = aehnlich(g.h, h), sa = aehnlich(g.a, a);
    if (sh > 0 && sa > 0 && sh + sa > bs) { bs = sh + sa; best = g; }
  }
  return best;
}

async function holen(url, mockName) {
  if (MOCK) { const f = `${MOCK}/${mockName}.json`; return fs.existsSync(f) ? { data: JSON.parse(fs.readFileSync(f, "utf8")), headers: new Map() } : null; }
  for (let i = 0; i < 2; i++) {
    try {
      const r = await fetch(url, { headers: { "user-agent": "tippkompass-update" } });
      if (r.ok) return { data: await r.json(), headers: r.headers };
      console.log("HTTP", r.status, url.replace(KEY, "***"));
      if ([400, 401, 403, 404, 422, 429].includes(r.status)) return null;
    } catch (e) { console.log("Fehler", e.message, url.replace(KEY, "***")); }
    await new Promise((s) => setTimeout(s, 3000));
  }
  return null;
}
const ymd = (d) => d.toISOString().slice(0, 10).replace(/-/g, "");
const zuerich = (d) => Number(new Intl.DateTimeFormat("en-GB", { timeZone: "Europe/Zurich", hour: "2-digit", hourCycle: "h23" }).format(d)); // Stunde 0–23
const standIso = (d) => { const z = new Date(d.toLocaleString("en-US", { timeZone: "Europe/Zurich" })); const off = Math.round((z - new Date(d.toLocaleString("en-US", { timeZone: "UTC" }))) / 6e4); const p = (n) => String(Math.abs(n)).padStart(2, "0"); return `${z.getFullYear()}-${p(z.getMonth() + 1)}-${p(z.getDate())}T${p(z.getHours())}:${p(z.getMinutes())}:00${off >= 0 ? "+" : "-"}${p(Math.floor(Math.abs(off) / 60))}:${p(Math.abs(off) % 60)}`; };

let d;
try { d = JSON.parse(fs.readFileSync(FILE, "utf8")); } catch (e) { console.error("data.json ist nicht lesbar, nichts geändert:", e.message); process.exit(1); }
if (!Array.isArray(d.SPIELE)) { console.error("data.json hat kein SPIELE-Feld, nichts geändert"); process.exit(1); }
d.RESULTATE = Array.isArray(d.RESULTATE) ? d.RESULTATE : [];
d.ARCHIV = Array.isArray(d.ARCHIV) ? d.ARCHIV : [];
delete d.TIPP_DER_WOCHE;
const vorher = JSON.stringify({ S: d.SPIELE, T: d.TOPS, R: d.RESULTATE, A: d.ARCHIV });
const log = [];

// ---------- 1) Resultate (ESPN) ----------
// ESPN: mehrere Varianten probieren (Datumsbereich, einzelne Tage, ohne Datum)
async function espn(pfad, von, bis) {
  const basis = `https://site.api.espn.com/apis/site/v2/sports/${pfad}/scoreboard`;
  const mock = "espn_" + pfad.replace("/", "_");
  if (MOCK) return holen(basis, mock);
  let r;
  const events = [];
  for (let t = new Date(von); t <= bis; t = new Date(t.getTime() + D)) {
    const x = await holen(`${basis}?dates=${ymd(t)}`, mock);
    if (x && x.data && Array.isArray(x.data.events)) events.push(...x.data.events);
  }
  if (events.length) return { data: { events } };
  r = await holen(basis, mock);
  if (!r) console.log("ESPN ohne Erfolg:", pfad);
  return r;
}
async function resultate() {
  const von = new Date(now.getTime() - 3 * D), bis = new Date(now.getTime() + D);
  for (const L of [...LIGEN, ...NUR_RESULTATE]) {
    if (L.liga === "NHL" && !d.SPIELE.some((g) => g.liga === "NHL" && !g.res)) continue;
    const r = await espn(L.espn, von, bis);
    if (!r) { log.push(`Resultate ${L.liga}: nicht erreichbar`); continue; }
    let neu = 0;
    for (const ev of r.data.events || []) {
      const c = ev.competitions?.[0]; if (!c) continue;
      if (!(c.status?.type?.completed ?? ev.status?.type?.completed)) continue;
      const home = c.competitors?.find((x) => x.homeAway === "home"), away = c.competitors?.find((x) => x.homeAway === "away");
      if (!home || !away) continue;
      const hs = Number(home.score?.value ?? home.score), as = Number(away.score?.value ?? away.score);
      if (!Number.isFinite(hs) || !Number.isFinite(as)) continue;
      const hn = home.team?.displayName || home.team?.name, an = away.team?.displayName || away.team?.name;
      let res = hs > as ? "h" : hs < as ? "a" : "u";
      if (home.winner === true) res = "h"; else if (away.winner === true) res = "a"; // NHL: Verlängerung/Penalty
      const g = finde(d.SPIELE.filter((x) => x.liga === L.liga), hn, an, ev.date || c.date);
      const H_ = g ? g.h : anzeige(hn), A_ = g ? g.a : anzeige(an);
      if (g && !g.res) { g.res = res; neu++; }
      const tag = (ev.date || c.date || "").slice(0, 10);
      if (L.liga !== "NHL" || g) {
        const nah = (x) => Math.abs(new Date(x.d) - new Date(tag)) <= D;
        if (!d.RESULTATE.some((x) => x.h === H_ && x.a === A_ && nah(x))) d.RESULTATE.push({ d: tag, h: H_, a: A_, hs, as });
      }
    }
    if (neu) log.push(`${L.liga}: ${neu} Resultat(e) eingetragen`);
  }
  // Tennis
  const offeneT = d.SPIELE.filter((g) => g.sport === "tennis" && !g.res && new Date(g.zeit) < now);
  if (!offeneT.length) return;
  const r = await espn("tennis/atp", von, bis);
  if (!r) { log.push("Resultate Tennis: nicht erreichbar"); return; }
  const comps = []; (function such(o) { if (!o || typeof o !== "object") return; if (Array.isArray(o)) return o.forEach(such); if (Array.isArray(o.competitors) && o.competitors.length === 2) comps.push(o); for (const k of Object.keys(o)) if (k !== "competitors" && typeof o[k] === "object") such(o[k]); })(r.data.events || []);
  let neu = 0;
  for (const c of comps) {
    if (!(c.status?.type?.completed)) continue;
    const [x, y] = c.competitors; const nx = x.athlete?.displayName || x.team?.displayName || x.displayName, ny = y.athlete?.displayName || y.team?.displayName || y.displayName;
    if (!nx || !ny || (x.winner !== true && y.winner !== true)) continue;
    const sieger = x.winner === true ? nx : ny;
    const g = finde(offeneT, nx, ny, c.date || c.startDate || now, 30) || finde(offeneT, ny, nx, c.date || c.startDate || now, 30);
    if (!g || g.res) continue;
    g.res = aehnlich(g.h, sieger) >= aehnlich(g.a, sieger) ? "h" : "a"; neu++;
  }
  if (neu) log.push(`Tennis: ${neu} Resultat(e) eingetragen`);
}

// ---------- 2) Quoten (The Odds API) ----------
let neueSpiele = 0, aktualisiert = 0, rest = null;
async function quoten() {
  const seit = d.ODDS_AT ? (now - new Date(d.ODDS_AT)) / H : 99;
  const h = zuerich(now);
  if (!KEY) { log.push("Quoten: kein ODDS_API_KEY gesetzt, übersprungen"); return; }
  if (!Number.isFinite(h)) log.push("Quoten: Uhrzeit nicht lesbar");
  if (!FORCE && !(seit >= 4 && h >= 8 && h <= 21)) { log.push(`Quoten: noch nicht fällig (vor ${seit.toFixed(1)} h geholt, ${h} Uhr)`); return; }
  let ok = false;
  const ligen = [...LIGEN];
  const sp = await holen(`https://api.the-odds-api.com/v4/sports/?apiKey=${KEY}`, "odds_sports"); // kostet keine Credits
  if (sp && Array.isArray(sp.data)) {
    const atp = sp.data.filter((x) => x.active && /^tennis_atp/.test(x.key) && !x.has_outrights && !/doubles/i.test(x.key + x.title));
    const rang = (x) => { const i = TENNIS_RANG.findIndex((re) => re.test(x.key + " " + x.title)); return i < 0 ? 99 : i; };
    atp.sort((a, b) => rang(a) - rang(b));
    if (atp[0] && rang(atp[0]) < 99) { ligen.push({ liga: atp[0].title.replace(/^ATP\s*/i, "ATP "), odds: atp[0].key, tennis: true }); log.push("Tennis-Turnier: " + atp[0].title); }
  }
  for (const L of ligen) {
    const r = await holen(`https://api.the-odds-api.com/v4/sports/${L.odds}/odds?apiKey=${KEY}&regions=eu&markets=h2h&oddsFormat=decimal&dateFormat=iso`, "odds_" + L.odds);
    if (!r) { log.push(`Quoten ${L.liga}: Fehler`); continue; }
    ok = true;
    const rem = r.headers.get?.("x-requests-remaining"); if (rem != null) rest = Number(rem);
    const kommende = (Array.isArray(r.data) ? r.data : []).filter((e) => { const t = new Date(e.commence_time); return t > now && t - now < 10 * D; })
      .sort((a, b) => a.commence_time.localeCompare(b.commence_time)).slice(0, 12);
    for (const e of kommende) {
      // Durchschnitt aller Anbieter, Marge herausrechnen
      const sum = { h: 0, u: 0, a: 0 }; let n = 0;
      for (const b of e.bookmakers || []) {
        const m = (b.markets || []).find((x) => x.key === "h2h"); if (!m) continue;
        const o = {}; for (const x of m.outcomes) { if (x.name === e.home_team) o.h = x.price; else if (x.name === e.away_team) o.a = x.price; else if (/draw/i.test(x.name)) o.u = x.price; }
        if (!o.h || !o.a || (!L.tennis && !o.u)) continue;
        const inv = { h: 1 / o.h, u: L.tennis ? 0 : 1 / o.u, a: 1 / o.a }, t = inv.h + inv.u + inv.a;
        sum.h += inv.h / t; sum.u += inv.u / t; sum.a += inv.a / t; n++;
      }
      if (!n) continue;
      let p = { h: +(sum.h / n * 100).toFixed(1) };
      if (!L.tennis) p.u = +(sum.u / n * 100).toFixed(1);
      p.a = +(100 - p.h - (p.u || 0)).toFixed(1);
      const id = "o" + e.id.slice(0, 10);
      let g = d.SPIELE.find((x) => x.id === id) || (L.tennis ? null : finde(d.SPIELE.filter((x) => x.liga === L.liga), e.home_team, e.away_team, e.commence_time, 3));
      if (g) { if (!g.res && new Date(g.zeit) > now) { g.p = p; g.zeit = new Date(e.commence_time).toISOString().replace(".000", ""); aktualisiert++; } }
      else { d.SPIELE.push({ id, sport: L.tennis ? "tennis" : "fussball", liga: L.liga, zeit: new Date(e.commence_time).toISOString().replace(".000", ""), h: anzeige(e.home_team), a: anzeige(e.away_team), p }); neueSpiele++; }
    }
  }
  if (ok) d.ODDS_AT = now.toISOString();
  log.push(`Quoten: ${neueSpiele} neue Spiele, ${aktualisiert} aktualisiert` + (rest != null ? `, noch ${rest} Credits` : ""));
}

// ---------- 3) Aufräumen, Top-Tipps, Tipp der Woche ----------
function aufraeumen() {
  // Spiele älter als 7 Tage ins Archiv (nur das Nötige), damit Wetten darauf abgerechnet bleiben.
  // Ohne Resultat nach 7 Tagen gilt das Spiel als abgesagt ("x"): Einsätze darauf gibt es zurück.
  for (const g of d.SPIELE) {
    if (new Date(g.zeit) > now - 7 * D || d.ARCHIV.some((x) => x.id === g.id)) continue;
    d.ARCHIV.push({ id: g.id, sport: g.sport, liga: g.liga, zeit: g.zeit, h: g.h, a: g.a, p: g.p, res: g.res || "x" });
    if (!g.res) log.push("Ohne Resultat archiviert (abgesagt): " + g.h + " – " + g.a);
  }
  d.ARCHIV = d.ARCHIV.filter((g) => new Date(g.zeit) > now - 120 * D);
  d.SPIELE = d.SPIELE.filter((g) => new Date(g.zeit) > now - 7 * D);
  const grenze = ymd(new Date(now - 30 * D));
  d.RESULTATE = d.RESULTATE.filter((r) => r.d.replace(/-/g, "") >= grenze).sort((a, b) => a.d.localeCompare(b.d))
    .filter((r, i, arr) => !arr.slice(0, i).some((x) => x.h === r.h && x.a === r.a && Math.abs(new Date(x.d) - new Date(r.d)) <= D));
  const ids = new Set(d.SPIELE.map((g) => g.id));
  const offen = (g) => !g.res && new Date(g.zeit) > now;
  d.TOPS = (d.TOPS || []).filter((t) => ids.has(t.id) && offen(d.SPIELE.find((g) => g.id === t.id)));
  const fav = (g) => { const k = ["h", "u", "a"].filter((x) => g.p[x] != null).sort((x, y) => g.p[y] - g.p[x])[0]; return { k, p: g.p[k] }; };
  const kand = d.SPIELE.filter((g) => offen(g) && g.sport !== "hockey" && !d.TOPS.some((t) => t.id === g.id))
    .map((g) => ({ g, f: fav(g) })).filter((x) => x.f.k !== "u" && x.f.p >= 60).sort((a, b) => b.f.p - a.f.p);
  for (const { g, f } of kand) {
    if (d.TOPS.length >= 6) break;
    const team = f.k === "h" ? g.h : g.a, geg = f.k === "h" ? g.a : g.h;
    const letzte = d.RESULTATE.filter((r) => r.h === team || r.a === team).slice(-4);
    const siege = letzte.filter((r) => (r.h === team ? r.hs > r.as : r.as > r.hs)).length;
    const gl = d.RESULTATE.filter((r) => r.h === geg || r.a === geg).slice(-4);
    const gs = gl.filter((r) => (r.h === geg ? r.hs > r.as : r.as > r.hs)).length;
    let text = letzte.length ? `${team} hat ${siege} der letzten ${letzte.length} Spiele gewonnen` : `${team} ist laut den Wettanbietern klarer Favorit`;
    if (gl.length) text += `, ${geg} nur ${gs} von ${gl.length}`;
    if (g.sport === "tennis") text = `${team} ist laut den Wettanbietern klarer Favorit gegen ${geg}. Im Tennis gibt es aber keinen Unentschieden-Puffer: Ein schlechter Tag reicht.`;
    else text += f.k === "h" ? ". Dazu der Heimvorteil." : ". Ich setze trotzdem auf den Auswärtssieg.";
    d.TOPS.push({ id: g.id, wahl: f.k, text });
  }
}

// Jeder Schritt einzeln: fällt einer aus, bleiben die anderen und die alten Daten erhalten
let fehler = 0;
for (const [name, fn] of [["Resultate", resultate], ["Quoten", quoten], ["Aufräumen", aufraeumen]]) {
  try { await fn(); } catch (e) { fehler++; log.push(`${name}: unerwarteter Fehler (${e.message}), Schritt übersprungen`); }
}
// Prüfen, bevor geschrieben wird
const okSpiel = (g) => g && typeof g.id === "string" && typeof g.h === "string" && typeof g.a === "string" && !isNaN(new Date(g.zeit)) && g.p && typeof g.p.h === "number";
const kaputt = d.SPIELE.filter((g) => !okSpiel(g));
if (kaputt.length) { log.push(`${kaputt.length} ungültige Spiele entfernt`); d.SPIELE = d.SPIELE.filter(okSpiel); }
const ids = d.SPIELE.map((g) => g.id);
if (new Set(ids).size !== ids.length) { console.error("Doppelte Spiel-IDs, nichts geschrieben"); process.exit(1); }
const nachher = JSON.stringify({ S: d.SPIELE, T: d.TOPS, R: d.RESULTATE, A: d.ARCHIV });
if (nachher !== vorher) d.STAND = standIso(now);
const tmp = new URL("../data.json.tmp", import.meta.url);
fs.writeFileSync(tmp, JSON.stringify(d, null, 1) + "\n");
fs.renameSync(tmp, FILE);
console.log(log.join("\n") || "Keine Änderungen");
if (fehler) console.log("Achtung:", fehler, "Schritt(e) mit Fehler");
console.log(nachher !== vorher ? "GEÄNDERT" : "UNVERÄNDERT", "| Spiele:", d.SPIELE.length, "| offen:", d.SPIELE.filter((g) => !g.res).length);
