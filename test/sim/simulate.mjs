// Simulation: 40 virtuelle Spieler, ein Teil versucht zu schummeln.
// Aufruf: node test/sim/simulate.mjs   (liest data.json, schreibt test/rangliste-demo.json und test/sim/bericht.md)
import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const P = require("../../scripts/pruefung.js");

const ROOT = new URL("../../", import.meta.url);
const d = JSON.parse(fs.readFileSync(new URL("data.json", ROOT), "utf8"));
const spiele = [...d.SPIELE, ...(d.ARCHIV || [])];
const NOW = Date.parse(process.env.NOW || new Date().toISOString());
const START = NOW - 7 * 864e5; // Demo: letzte 7 Tage (echt: ab Montag)

let seed = 42;
const rnd = () => ((seed = (seed * 1103515245 + 12345) % 2147483648) / 2147483648);
const pick = (a) => a[Math.floor(rnd() * a.length)];
const kick = (g) => Date.parse(g.zeit);
const fav = (g) => Object.entries(g.p).filter(([, v]) => v != null).sort((a, b) => b[1] - a[1])[0][0];
const aussen = (g) => Object.entries(g.p).filter(([k, v]) => v != null && k !== "u").sort((a, b) => a[1] - b[1])[0][0];
const q = (g, k) => Math.round(P.quote(g, k) * 100) / 100;

const imFenster = spiele.filter((g) => kick(g) > START + 2 * 3600e3 && g.res !== "x").sort((a, b) => kick(a) - kick(b));
const fertig = imFenster.filter((g) => g.res);
const offen = imFenster.filter((g) => !g.res && kick(g) > NOW);

let wid = 0;
const wette = (uid, ts, einsatz, picks, extra = {}) => ({ id: "w" + ++wid, uid, ts, einsatz, picks, ...extra });

// Ehrlicher Spieler: setzt wie die App es zulässt (eigenes Budget beachten)
function ehrlich(uid, stil) {
  const out = []; let budget = P.BUDGET; const offeneE = [];
  const pool = [...fertig, ...offen].filter(() => rnd() < 0.55);
  for (const g of pool) {
    const ts = Math.max(START + 60e3, kick(g) - (1 + rnd() * 40) * 3600e3);
    if (ts >= NOW) continue;
    // abgerechnete eigene Wetten zurückbuchen, bevor neu gesetzt wird
    for (let i = offeneE.length - 1; i >= 0; i--) if (offeneE[i].bis <= ts) { budget += offeneE[i].ausz; offeneE.splice(i, 1); }
    const k = stil === "aussen" ? aussen(g) : stil === "mix" ? pick(["h", "a", fav(g)]) : fav(g);
    if (g.p[k] == null) continue;
    let e = Math.round((5 + rnd() * (stil === "vorsichtig" ? 25 : 120)) * 100) / 100;
    if (e > budget) e = Math.floor(budget);
    if (e < 1) continue;
    const w = wette(uid, ts, e, [{ g: g.id, k, q: q(g, k) }]);
    budget -= e;
    const ausz = g.res ? (g.res === k ? e * w.picks[0].q : 0) : null;
    if (ausz !== null) offeneE.push({ bis: kick(g) + 3 * 3600e3, ausz });
    out.push(w);
  }
  // eine Kombi aus zwei kommenden Spielen
  if (offen.length > 3 && stil !== "vorsichtig" && budget > 10) {
    const [a, b] = [offen[1], offen[3]];
    out.push(wette(uid, Math.min(NOW - 60e3, kick(a) - 3600e3), 10, [{ g: a.id, k: fav(a), q: q(a, fav(a)) }, { g: b.id, k: fav(b), q: q(b, fav(b)) }]));
  }
  return out;
}

const spieler = [];
const namen = {};
const vornamen = ["Lea", "Nico", "Mara", "Jan", "Sara", "Luca", "Mia", "Noah", "Elin", "Tim", "Lara", "Ben", "Nina", "Leon", "Zoe", "Finn", "Ava", "Elias", "Lina", "Max", "Emma", "Jonas", "Lia", "Paul", "Ella", "Samuel", "Alina", "David", "Sofia", "Tom", "Julia", "Levin", "Anna", "Robin", "Noemi", "Fabio", "Laura", "Yanis", "Chiara", "Matteo", "Ilaria", "Dario", "Selina", "Aaron", "Mila"];
const add = (i, art, erwartet, wetten, beschreibung) => {
  const uid = "u" + String(i).padStart(2, "0");
  const email = "v" + String(i).padStart(2, "0") + "@test.tippkompass.ch";
  namen[uid] = { nick: vornamen[i - 1] };
  spieler.push({ uid, email, nick: vornamen[i - 1], art, erwartet, beschreibung, wetten: wetten(uid) });
};

const F = fertig, gF = (i) => F[i % F.length], gO = (i) => offen[i % Math.max(1, offen.length)];
const stile = ["fav", "fav", "mix", "aussen", "vorsichtig"];
let i = 1;
for (; i <= 26; i++) add(i, "ehrlich", "ok", (u) => ehrlich(u, stile[i % stile.length]), "Spielt normal (" + stile[i % stile.length] + ")");
// Grenzfälle, die NICHT gesperrt werden dürfen
add(i++, "grenzfall", "ok", (u) => { const g = gF(1), k = fav(g); return [wette(u, kick(g) - 3600e3, 50, [{ g: g.id, k, q: Math.round(q(g, k) * 1.2 * 100) / 100 }])]; }, "Quote 20 % höher (Quoten bewegen sich), muss erlaubt sein");
add(i++, "grenzfall", "ok", (u) => { const g = gF(2), k = fav(g); return [wette(u, kick(g) - 3600e3, 1000, [{ g: g.id, k, q: q(g, k) }])]; }, "Setzt genau das ganze Wochen-Spielgeld (Fr. 1000)");
add(i++, "grenzfall", "ok", (u) => { const g = gF(3); return [wette(u, kick(g) - 7200e3, 20, [{ g: g.id, k: "h", q: q(g, "h") }]), wette(u, kick(g) - 7100e3, 20, [{ g: g.id, k: "a", q: q(g, "a") }])]; }, "Setzt auf beide Seiten desselben Spiels (erlaubt)");
add(i++, "grenzfall", "ok", (u) => { const g = gF(4), k = fav(g); return [wette(u, kick(g) - 3600e3, 30, [{ g: g.id, k, q: q(g, k) }], { gewinn: 999999, stand: 999999 })]; }, "Trägt sich selbst Fr. 999'999 Gewinn ein (muss ignoriert werden)");
// Schummler
add(i++, "schummler", "gesperrt", (u) => { const g = gF(5), k = fav(g); return [wette(u, kick(g) - 3600e3, 500, [{ g: g.id, k, q: 25 }])]; }, "Fälscht die Quote auf 25");
add(i++, "schummler", "gesperrt", (u) => { const g = gF(6), k = g.res; return [wette(u, kick(g) + 20 * 60e3, 900, [{ g: g.id, k, q: q(g, k) }])]; }, "Wettet 20 Min. nach Anpfiff auf das richtige Resultat");
add(i++, "schummler", "gesperrt", (u) => [wette(u, NOW - 3600e3, 100, [{ g: "o999999999", k: "h", q: 3 }])], "Erfindet ein Spiel");
add(i++, "grenzfall", "ok", (u) => { const a = gO(0), b = gO(2); return [wette(u, NOW - 7200e3, 900, [{ g: a.id, k: fav(a), q: q(a, fav(a)) }]), wette(u, NOW - 3600e3, 900, [{ g: b.id, k: fav(b), q: q(b, fav(b)) }])]; }, "Überzieht einmal (z. B. zwei Handys): Wette ignoriert, keine Sperre");
add(i++, "schummler", "gesperrt", (u) => { const gs = [gO(0), gO(1), gO(2), gO(3), gO(4)]; return gs.map((g, j) => wette(u, NOW - (6 - j) * 3600e3, 800, [{ g: g.id, k: fav(g), q: q(g, fav(g)) }])); }, "Überzieht immer wieder (5× Fr. 800)");
add(i++, "grenzfall", "ok", (u) => { const g = gF(14), k = fav(g); return [wette(u, kick(g) + 40e3, 30, [{ g: g.id, k, q: q(g, k) }])]; }, "Tippt in letzter Sekunde, kommt 40 s nach Anpfiff an: ignoriert, keine Sperre");
add(i++, "schummler", "gesperrt", (u) => { const g = gF(7), k = fav(g); return [wette(u, kick(g) - 3600e3, 50000, [{ g: g.id, k, q: q(g, k) }])]; }, "Einsatz Fr. 50'000");
add(i++, "schummler", "gesperrt", (u) => { const g = gF(8), k = fav(g); return [wette(u, kick(g) - 3600e3, -100, [{ g: g.id, k, q: q(g, k) }])]; }, "Negativer Einsatz");
add(i++, "schummler", "gesperrt", (u) => { const g = gF(9), k = fav(g); return [wette(u, kick(g) - 3600e3, "100", [{ g: g.id, k, q: q(g, k) }])]; }, "Einsatz als Text statt Zahl");
add(i++, "schummler", "gesperrt", (u) => { const g = [...F, ...offen].find((x) => x.sport === "tennis") || gF(10); return [wette(u, kick(g) - 3600e3, 50, [{ g: g.id, k: g.sport === "tennis" ? "u" : "z", q: 3 }])]; }, "Unentschieden im Tennis bzw. ungültiger Ausgang");
add(i++, "grenzfall", "ok", (u) => { const g = gF(11), k = fav(g); const w = wette(u, kick(g) - 3600e3, 100, [{ g: g.id, k, q: q(g, k) }]); return [w, { ...w }]; }, "Dieselbe Wette zweimal eingereicht: zählt nur einmal");
add(i++, "schummler", "gesperrt", (u) => { const g = gF(12), k = fav(g); return [wette(u, kick(g) - 3600e3, 50, [{ g: g.id, k, q: q(g, k) }, { g: g.id, k, q: q(g, k) }])]; }, "Gleiches Spiel zweimal in einer Kombi (verdoppelt die Quote)");
add(i++, "schummler", "gesperrt", (u) => { const g = gO(1), k = fav(g); return [wette(u, NOW + 3 * 864e5, 50, [{ g: g.id, k, q: q(g, k) }])]; }, "Zeit in die Zukunft gefälscht");
add(i++, "schummler", "gesperrt", (u) => { const g = gF(13), k = fav(g); return [wette(u, kick(g) - 3600e3, 200, [{ g: g.id, k, q: Math.round(q(g, k) * 1.6 * 100) / 100 }])]; }, "Quote unauffällig um 60 % erhöht");
add(i++, "spam", "ok", (u) => { const g = gO(3), k = fav(g); return Array.from({ length: 320 }, (_, j) => wette(u, NOW - (j + 1) * 60e3, 1, [{ g: g.id, k, q: q(g, k) }])); }, "320 Mini-Wetten (nur Hinweis, keine Sperre)");

const alle = spieler.flatMap((s) => s.wetten);
const res = P.pruefe({ wetten: alle, spiele, start: START, now: NOW });
const rang = P.rangliste(res, namen);

let ok = 0, fp = 0, fn = 0;
const zeilen = spieler.map((s) => {
  const r = res.spieler[s.uid] || { gesperrt: false, gewinn: 0, verstoesse: [], hinweise: [], wetten: 0 };
  const ist = r.gesperrt ? "gesperrt" : "ok";
  const richtig = ist === s.erwartet;
  if (richtig) ok++; else if (ist === "gesperrt") fp++; else fn++;
  const platz = rang.liste.find((z) => z.uid === s.uid)?.platz;
  return `| ${s.email} | ${s.nick} | ${s.beschreibung} | ${s.erwartet} | ${ist}${platz ? " (Platz " + platz + ")" : ""} | ${richtig ? "✓" : "✗"} | ${(r.verstoesse[0]?.grund || r.hinweise[0] || "").replace(/\|/g, "/")} |`;
});
const bericht = `# Test Weltrangliste: ${spieler.length} virtuelle Spieler

Daten: ${spiele.length} Spiele (${fertig.length} mit Resultat im Zeitraum), ${alle.length} Wetten, Prüfzeit ${new Date(NOW).toISOString()}.

**Ergebnis: ${ok} von ${spieler.length} richtig beurteilt · ${fp} ehrliche fälschlich gesperrt · ${fn} Schummler übersehen**

| E-Mail | Name | Was der Spieler macht | Erwartet | Ergebnis | | Grund |
|---|---|---|---|---|---|---|
${zeilen.join("\n")}

## Top 10
${rang.liste.slice(0, 10).map((z) => `${z.platz}. ${z.nick} – Fr. ${z.gewinn.toFixed(2)}`).join("\n")}
`;
fs.writeFileSync(new URL("test/sim/bericht.md", ROOT), bericht);
// Demo-Daten für die Testversion (ohne E-Mails)
fs.writeFileSync(new URL("test/rangliste-demo.json", ROOT), JSON.stringify({ start: START, now: NOW, namen, wetten: alle }));
console.log(`${ok}/${spieler.length} richtig, ${fp} fälschlich gesperrt, ${fn} übersehen`);
if (fp || fn) process.exitCode = 1;
