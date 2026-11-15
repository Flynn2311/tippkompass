// Firebase: Anmeldung und Online-Spielstand
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js";
import { getAuth, onAuthStateChanged, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail, signOut, deleteUser } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js";
import { getFirestore, doc, getDoc, setDoc, deleteDoc, onSnapshot, collection, query, where } from "https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyB1s_gUsDwx5kgW8cxbJEX-ReOm6tec5kk",
  authDomain: "tipkompass.firebaseapp.com",
  projectId: "tipkompass",
  storageBucket: "tipkompass.firebasestorage.app",
  messagingSenderId: "757701631207",
  appId: "1:757701631207:web:1718b6ae9fd6ce1e3ed642",
};

const sauber = (o) => JSON.parse(JSON.stringify(o)); // Firestore mag kein undefined

window.tkFirebase = (async () => {
  try {
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    auth.languageCode = "de";
    const fs = getFirestore(app);
    const db = {
      doc(path) {
        const ref = doc(fs, path);
        return {
          async get() { const s = await getDoc(ref); return s.exists() ? s.data() : null; },
          async set(v) { await setDoc(ref, sauber(v)); },
          async remove() { await deleteDoc(ref); },
          onSnapshot(cb) { return onSnapshot(ref, (s) => cb(s.exists() ? s.data() : null), () => {}); },
        };
      },
      mitglieder(code, cb) {
        const q = query(collection(fs, "members"), where("gruppe", "==", code));
        return onSnapshot(q, (snap) => cb(snap.docs.map((d) => ({ id: d.id, ...d.data() }))), () => {});
      },
    };
    return {
      db,
      onAuth(cb) { onAuthStateChanged(auth, cb); },
      google() { return signInWithPopup(auth, new GoogleAuthProvider()); },
      login(mail, pw) { return signInWithEmailAndPassword(auth, mail, pw); },
      register(mail, pw) { return createUserWithEmailAndPassword(auth, mail, pw); },
      reset(mail) { return sendPasswordResetEmail(auth, mail); },
      logout() { return signOut(auth); },
      deleteMe() { return deleteUser(auth.currentUser); },
    };
  } catch (e) { console.warn("Firebase nicht verfügbar", e); return null; }
})();
