import { initializeApp } from "firebase/app";
import {initializeAuth, getReactNativePersistence, getAuth} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyB2y6NnvF6n2hzpa0Lpgw0pakllK4pWGvQ",
  authDomain: "test-44ef4.firebaseapp.com",
  projectId: "test-44ef4",
  storageBucket: "test-44ef4.appspot.com",
  messagingSenderId: "812179279848",
  appId: "1:812179279848:web:6550a335edb2a2a5641e5d",
  measurementId: "G-F3T3YV82K7"
};

export const app = initializeApp(firebaseConfig);
initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage)
});
export const auth = getAuth(app);
const db = getFirestore(app);

export { db };
