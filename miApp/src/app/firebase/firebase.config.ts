// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyA32Kr40zOr3bvMWrFgMi0Mj_y8OPc5ZBI",
  authDomain: "homecook-76d10.firebaseapp.com",
  projectId: "homecook-76d10",
  storageBucket: "homecook-76d10.firebasestorage.app",
  messagingSenderId: "466948575345",
  appId: "1:466948575345:web:5647cf8b1a0c2fd56e0bd0",
  measurementId: "G-TJ4B182SNG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
