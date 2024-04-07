import { initializeApp } from "firebase/app";
import {initializeAuth, getReactNativePersistence, getAuth} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBhjtzCmgMxG7pFTvjTx-K6eACtxqKqyTo",
  authDomain: "chatapplication-794ae.firebaseapp.com",
  projectId: "chatapplication-794ae",
  storageBucket: "chatapplication-794ae.appspot.com",
  messagingSenderId: "159022213726",
  appId: "1:159022213726:web:42eb208deaef4fea4be2cf"
};

export const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const auth = getAuth(app);
const db = getFirestore(app);

export { db };
