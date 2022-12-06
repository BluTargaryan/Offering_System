// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBVjwst13AOvs8XqPZ890kcLVTHkSJyMGs",
  authDomain: "offering-system-6e9b7.firebaseapp.com",
  projectId: "offering-system-6e9b7",
  storageBucket: "offering-system-6e9b7.appspot.com",
  messagingSenderId: "410597421009",
  appId: "1:410597421009:web:2e4c8c77cda781a10d7af0",
  measurementId: "G-2DE5DVDK5D"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export {db};