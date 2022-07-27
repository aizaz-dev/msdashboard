// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBE31LufxvPpC-MaISIvQKIks-xk1Wk6sE",
  authDomain: "mspractice-1ae45.firebaseapp.com",
  projectId: "mspractice-1ae45",
  storageBucket: "mspractice-1ae45.appspot.com",
  messagingSenderId: "140337606953",
  appId: "1:140337606953:web:0cb03e83632d7e82118738",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);
