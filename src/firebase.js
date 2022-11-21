// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCiKkAuj25qn8m3BIyfhKKuOiz_iihy6-o",
  authDomain: "offering-system.firebaseapp.com",
  projectId: "offering-system",
  storageBucket: "offering-system.appspot.com",
  messagingSenderId: "502168466929",
  appId: "1:502168466929:web:45dfdb431fc364a5e8c050",
  measurementId: "G-VL9DFQR4T0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};