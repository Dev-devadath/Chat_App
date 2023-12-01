import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD5RR2gqbiL-DOsxDKzwXZtoo7hGMDfEUE",
  authDomain: "chatapp-364d7.firebaseapp.com",
  projectId: "chatapp-364d7",
  storageBucket: "chatapp-364d7.appspot.com",
  messagingSenderId: "913095315611",
  appId: "1:913095315611:web:2e870869e58a69e86a763e",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const storage = getStorage();
export const db = getFirestore()
