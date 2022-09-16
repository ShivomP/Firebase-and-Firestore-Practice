// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAQV9FKyfjg4U_B98bIRAHNmfaUMzTnqI0",
  authDomain: "fir-practice-80292.firebaseapp.com",
  projectId: "fir-practice-80292",
  storageBucket: "fir-practice-80292.appspot.com",
  messagingSenderId: "154054298064",
  appId: "1:154054298064:web:47bbad179be6faf34911d5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth()
export const db = getFirestore()