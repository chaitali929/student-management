import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC79kAmk4YCoLuKmQN0yoeLej1LvGhN-UQ",
  authDomain: "studentmanagement-b363f.firebaseapp.com",
  projectId: "studentmanagement-b363f",
  storageBucket: "studentmanagement-b363f.firebasestorage.app",
  messagingSenderId: "686807343854",
  appId: "1:686807343854:web:82313f1deb06e9e4b709ff",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);