import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBtPNc2tl1ORcWfbllev70_2HRLX_zSZ-g",
  authDomain: "codebattle-f492d.firebaseapp.com",
  projectId: "codebattle-f492d",
  storageBucket: "codebattle-f492d.firebasestorage.app",
  messagingSenderId: "489713831255",
  appId: "1:489713831255:web:779e472aeb91fb20848212",
  measurementId: "G-F8G6S0DFRE"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
