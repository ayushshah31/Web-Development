// Import the functions you need from the SDKs you need
import firebase from "firebase/compat/app";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAKAmyu1AUjVNWARxT-MSfgTxPLFssfi4M",
  authDomain: "react-redux-marioplan-5b482.firebaseapp.com",
  projectId: "react-redux-marioplan-5b482",
  storageBucket: "react-redux-marioplan-5b482.appspot.com",
  messagingSenderId: "402724683640",
  appId: "1:402724683640:web:ee360a3cfc1713d47b928d"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
firebase.firestore().settings({timestamsInSnapshots : true , merge:true});

export default firebase;
