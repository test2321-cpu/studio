// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7--ZHlXbSiTQYl-9nUfYuFcFLsp8uwrc",
  authDomain: "cricket-pulse4.firebaseapp.com",
  projectId: "cricket-pulse4",
  storageBucket: "cricket-pulse4.appspot.com",
  messagingSenderId: "110387088759",
  appId: "1:110387088759:web:69d28db49e79c3532f2572",
  measurementId: "G-PE75085TD2"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
let analytics;
if (typeof window !== 'undefined') {
  analytics = getAnalytics(app);
}


export { app, analytics };
