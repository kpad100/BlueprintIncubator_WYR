import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyAcf_D0EltZ5YRx81oWz8kL-j-cMFtQP9I",
    authDomain: "blueprintloginpage.firebaseapp.com",
    projectId: "blueprintloginpage",
    storageBucket: "blueprintloginpage.appspot.com",
    messagingSenderId: "908170588527",
    appId: "1:908170588527:web:bf100155f1a8b4eb87b89a",
    measurementId: "G-GPWLQGTPWE"
}

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;