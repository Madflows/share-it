// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyCBxW8wTyz1ZH80fAcFrAJS15wBeL5WvqI",
  authDomain: "share-board-19563.firebaseapp.com",
  projectId: "share-board-19563",
  storageBucket: "share-board-19563.appspot.com",
  messagingSenderId: "291942446686",
  appId: "1:291942446686:web:5ff69dc9583068fe4866cf",
  measurementId: "G-865T39X8NV",
};

// Initialize Firebase
initializeApp(firebaseConfig);
const db = getFirestore();

export { db };
