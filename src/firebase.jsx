// Importa Firebase
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // Importa Firestore

// Configuración de Firebase (con tus credenciales)
const firebaseConfig = {
  apiKey: "AIzaSyDGDTtlctt8lfMtxIyWCfTkAviXVD5ZItQ",
  authDomain: "clase-one-7f897.firebaseapp.com",
  projectId: "clase-one-7f897",
  storageBucket: "clase-one-7f897.firebasestorage.app",
  messagingSenderId: "570905771772",
  appId: "1:570905771772:web:6ce0f4fbf3b4459f73e179",
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa el servicio de autenticación
const auth = getAuth(app);

// Inicializa Firestore
const db = getFirestore(app);

// Exporta auth y db para usarlos en otros componentes
export { auth, db };