import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "apikey",
  authDomain: "medicaux-ed0ee.firebaseapp.com",
  projectId: "medicaux-ed0ee",
  storageBucket: "medicaux-ed0ee.appspot.com",
  messagingSenderId: "670873354564",
  appId: "1:670873354564:web:1ce93761a67fff4b6fd711",
  measurementId: "G-1LRRHF0NKH"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
