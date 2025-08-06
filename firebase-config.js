// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

// Check if Firebase is initialized
console.log('Firebase config loaded');

// Your Firebase config (replace these)
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAb463iTiMSuoyJ2Mj-ykuNW8AiSrC-spA",
  authDomain: "university-page-50416.firebaseapp.com",
  projectId: "university-page-50416",
  storageBucket: "university-page-50416.appspot.com",
  messagingSenderId: "790813779251",
  appId: "1:790813779251:web:c6ae4fda353cc6b8710a46",
  measurementId: "G-3VG2CBLJTT"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
