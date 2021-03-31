// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import firebase from "firebase/app";

// Add the Firebase services that you want to use
import "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyAcf_D0EltZ5YRx81oWz8kL-j-cMFtQP9I",
    authDomain: "blueprintloginpage.firebaseapp.com",
    projectId: "blueprintloginpage",
    storageBucket: "blueprintloginpage.appspot.com",
    messagingSenderId: "908170588527",
    appId: "1:908170588527:web:bf100155f1a8b4eb87b89a",
    measurementId: "G-GPWLQGTPWE"
  };

firebase.initializeApp(firebaseConfig);