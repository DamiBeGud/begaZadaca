// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBcWbp7v3seR14RUP2MIXTqQQq0hNrx6o8",
  authDomain: "bega-19925.firebaseapp.com",
  projectId: "bega-19925",
  storageBucket: "bega-19925.appspot.com",
  messagingSenderId: "523314632121",
  appId: "1:523314632121:web:2d75c20bb9ad0c9dd3d268"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app)
const storage = getStorage(app);

export {db, storage}