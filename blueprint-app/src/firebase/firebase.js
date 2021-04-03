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
<<<<<<< HEAD:blueprint-app/src/firebase.js
})
//export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = app.firestore();
=======
}

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
>>>>>>> 8dfe761a90e90547487e160ae63ecfee1900d208:blueprint-app/src/firebase/firebase.js
export const db = baseDb;