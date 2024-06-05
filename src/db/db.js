import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs, query, orderBy, limit } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD2HAqCBowazO4V_LgGmeOb8KGn2JpS8pc",
  authDomain: "boltzmanlagrange.firebaseapp.com",
  projectId: "boltzmanlagrange",
  storageBucket: "boltzmanlagrange.appspot.com",
  messagingSenderId: "515936640801",
  appId: "1:515936640801:web:d72c908a5613c8df7fe860"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);