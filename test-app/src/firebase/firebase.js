import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC7Av_b47utpUDZ98tAMPUzNebtsuAg6Tc",
    authDomain: "test-app-auth-ab650.firebaseapp.com",
    projectId: "test-app-auth-ab650",
    storageBucket: "test-app-auth-ab650.appspot.com",
    messagingSenderId: "325562763336",
    appId: "1:325562763336:web:c9aff09f25a2d9a7d7b07d",
    measurementId: "G-J3KHRMVBGD"
};

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;
