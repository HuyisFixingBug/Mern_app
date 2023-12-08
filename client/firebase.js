// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "badminton-2c955.firebaseapp.com",
  projectId: "badminton-2c955",
  storageBucket: "badminton-2c955.appspot.com",
  messagingSenderId: "66983123029",
  appId: "1:66983123029:web:58f9d6234b29a631f31cdc",
  measurementId: "G-YCKD4QXZVF",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
