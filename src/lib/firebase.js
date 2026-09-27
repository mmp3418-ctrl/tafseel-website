import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCfe92epuUQY7oHOdbwLYPDx7jgtgP6-MI",
  authDomain: "tafasel-4840c.firebaseapp.com",
  projectId: "tafasel-4840c",
  storageBucket: "tafasel-4840c.firebasestorage.app",
  messagingSenderId: "1093253713976",
  appId: "1:1093253713976:web:c5d29fefe320f35312d6cd",
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
