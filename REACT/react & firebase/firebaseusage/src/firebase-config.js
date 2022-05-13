// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from '@firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-e4qToGcV-_DvTG3Dz8vDgUS5Tjoxnuw",
  authDomain: "fir-react-8fdc3.firebaseapp.com",
  projectId: "fir-react-8fdc3",
  storageBucket: "fir-react-8fdc3.appspot.com",
  messagingSenderId: "1094832835366",
  appId: "1:1094832835366:web:c0cb59cabda403719e0fe7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app); 