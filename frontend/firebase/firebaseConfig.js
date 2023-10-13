// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6Sk5YwEldHe8DokE_6bG6fEWo0RdEV_Q",
  authDomain: "fashion-47ae6.firebaseapp.com",
  projectId: "fashion-47ae6",
  storageBucket: "fashion-47ae6.appspot.com",
  messagingSenderId: "56168327726",
  appId: "1:56168327726:web:74ea92404baa01a6cd4dbf",
  measurementId: "G-XXPZ4QT47D",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
export default storage;
