import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDGDTtlctt8lfMtxIyWCfTkAviXVD5ZItQ",
  authDomain: "clase-one-7f897.firebaseapp.com",
  projectId: "clase-one-7f897",
  storageBucket: "clase-one-7f897.firebasestorage.app",
  messagingSenderId: "570905771772",
  appId: "1:570905771772:web:6ce0f4fbf3b4459f73e179",
};
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };