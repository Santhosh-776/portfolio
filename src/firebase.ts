// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBmfQgDwV3RXx3hosmKurVF31xQkJYZR3A",
  authDomain: "portfolio-c92d7.firebaseapp.com",
  projectId: "portfolio-c92d7",
  storageBucket: "portfolio-c92d7.firebasestorage.app",
  messagingSenderId: "687975839563",
  appId: "1:687975839563:web:ce66ea6882e8cd9d291ace",
  measurementId: "G-83MRDX95SW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Analytics only in browser environment
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}

export { app, analytics };
