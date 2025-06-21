import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyAmVXuDol6h-SqRUZR0f-1qaa4s6lRBLXk",
    authDomain: "dine-time-c1b61.firebaseapp.com",
    projectId: "dine-time-c1b61",
    storageBucket: "dine-time-c1b61.firebasestorage.app",
    messagingSenderId: "460752570218",
    appId: "1:460752570218:web:8caf4255a89e409aa30713",
    measurementId: "G-DQKQECTDSM"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);