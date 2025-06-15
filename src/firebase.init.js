import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCCb2lD5UtlhqzDu8K7Rbt0htUc6N0qOns",
  authDomain: "artifacts-aefd6.firebaseapp.com",
  projectId: "artifacts-aefd6",
  storageBucket: "artifacts-aefd6.firebasestorage.app",
  messagingSenderId: "563782067152",
  appId: "1:563782067152:web:dcd84db49507e7a30e4fd5"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);