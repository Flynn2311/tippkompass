// Weltrangliste: prüft alle Wetten der Woche und schreibt die Rangliste.
// Läuft auf GitHub (Workflow), nur wenn das Secret FIREBASE_SA gesetzt ist.
// Nur dieses Skript darf rangliste/ und rang/ schreiben (Admin-Zugang umgeht die Regeln).
import fs from "node:fs";
import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const P = require("./pruefung.js");

export async function lauf(db, { now = Date.now(), spiele, log = console.log } = {}) {
  const start = P.wochenStart(now);
  // Wetten der Woche (ts = Serverzeit, von den Regeln erzwungen)
  const snap = await db.collection("bets").where("ts", ">=", new Date(start)).get();
  const wetten = snap.docs.map((d) => {
    const x = d.data();
    const ts = x.ts && typeof x.ts.toMillis === "function" ? x.ts.toMillis() : x.ts instanceof Date ? x.ts.getTime() : NaN;
    return { id: d.id, uid: x.uid, ts, einsatz: x.einsatz, picks: x.picks };
  });
  // Wer macht mit, und wer ist schon gesperrt
  const namen = {};
  (await db.collection("welt").get()).docs.forEach((d) => { const x = d.data(); namen[d.id] = { nick: typeof x.nick === "string" ? x.nick.slice(0, 20) : "Spieler", dabei: x.dabei !== false }; });
  (await db.collection("rang").get()).docs.forEach((d) => { if (d.data().gesperrt) (namen[d.id] = namen[d.id] || { nick: "Spieler" }).gesperrt = true; });
  const nurDabei = wetten.filter((w) => namen[w.uid] && namen[w.uid].dabei);
  const res = P.pruefe({ wetten: nurDabei, spiele, start, now });
  const rang = P.rangliste(res, namen);

  const batches = []; let b = db.batch(), n = 0;
  const set = (ref, data) => { b.set(ref, data); if (++n === 450) { batches.push(b); b = db.batch(); n = 0; } };
  set(db.collection("rangliste").doc("woche"), {
    start, stand: now, anzahl: rang.liste.length, gesperrt: rang.gesperrt.length,
    top: rang.liste.slice(0, 50).map((z) => ({ platz: z.platz, nick: z.nick, gewinn: z.gewinn })),
  });
  for (const [uid, s] of Object.entries(res.spieler)) {
    const z = rang.liste.find((x) => x.uid === uid);
    const gesperrt = s.gesperrt || !!namen[uid]?.gesperrt;
    set(db.collection("rang").doc(uid), {
      woche: start, stand: now, platz: z ? z.platz : null, von: rang.liste.length, gewinn: s.gewinn, rest: s.stand, offen: s.offen,
      gesperrt, grund: gesperrt ? (s.verstoesse[0]?.grund || "Frühere Unstimmigkeiten") : null,
    });
  }
  batches.push(b);
  for (const x of batches) await x.commit();
  log(`Weltrangliste: ${rang.liste.length} Spieler, ${rang.gesperrt.length} gesperrt, ${nurDabei.length} Wetten geprüft`);
  return { rang, res };
}

// Direkt aufgerufen (GitHub): mit firebase-admin verbinden
if (import.meta.url === `file://${process.argv[1]}`) {
  if (!process.env.FIREBASE_SA) { console.log("Weltrangliste: kein FIREBASE_SA gesetzt, übersprungen"); process.exit(0); }
  const { initializeApp, cert } = await import("firebase-admin/app");
  const { getFirestore } = await import("firebase-admin/firestore");
  initializeApp({ credential: cert(JSON.parse(process.env.FIREBASE_SA)) });
  const d = JSON.parse(fs.readFileSync(new URL("../data.json", import.meta.url), "utf8"));
  await lauf(getFirestore(), { spiele: [...d.SPIELE, ...(d.ARCHIV || [])] });
}
