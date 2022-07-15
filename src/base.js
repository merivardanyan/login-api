// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAtkWx_xfpOTYLYuDwI8SSE9NWIQHCCwg0",
    authDomain: "login-form-fa51f.firebaseapp.com",
    databaseURL: "https://login-form-fa51f-default-rtdb.firebaseio.com",
    projectId: "login-form-fa51f",
    storageBucket: "login-form-fa51f.appspot.com",
    messagingSenderId: "672818184784",
    appId: "1:672818184784:web:554f17f3bd08e3108c0755",
    measurementId: "G-1DW8C94PHS"
  };

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const auth = getAuth();

export const db = getDatabase(app);
export default app;