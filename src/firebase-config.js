import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBO6rFLD6tJqDoNDACqcQfIEWzmtQ1TkW4",
  authDomain: "medicaux.firebaseapp.com",
  projectId: "medicaux",
  storageBucket: "medicaux.appspot.com",
  messagingSenderId: "654128259945",
  appId: "1:654128259945:web:978df6f2ef83c4b5b393f8",
  measurementId: "G-ZP8GCQ7NW6"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);