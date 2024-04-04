import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyBhjtzCmgMxG7pFTvjTx-K6eACtxqKqyTo",
  authDomain: "chatapplication-794ae.firebaseapp.com",
  projectId: "chatapplication-794ae",
  storageBucket: "chatapplication-794ae.appspot.com",
  messagingSenderId: "159022213726",
  appId: "1:159022213726:web:8b1df4e62c043ce84be2cf"
};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);