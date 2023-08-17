// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore/lite';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVwN-f4vojcliJ45Q0kNIBw7d3T1xyHIw",
  authDomain: "react-cursos-1846d.firebaseapp.com",
  projectId: "react-cursos-1846d",
  storageBucket: "react-cursos-1846d.appspot.com",
  messagingSenderId: "211337140968",
  appId: "1:211337140968:web:21d0b193923a48708bc75d"
};

// Initialize Firebase
const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const Firestore = getFirestore(FirebaseApp);