// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const db = getFirestore(app)