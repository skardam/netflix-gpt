// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyABVxMVG0ebUeyNMCRORXrKHXxZl8CXlYI",
  authDomain: "netflixgpt-b99fd.firebaseapp.com",
  projectId: "netflixgpt-b99fd",
  storageBucket: "netflixgpt-b99fd.firebasestorage.app",
  messagingSenderId: "551431596391",
  appId: "1:551431596391:web:c99aee81bfc963b9caa7c2",
  measurementId: "G-6PJ61H1N0R",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
