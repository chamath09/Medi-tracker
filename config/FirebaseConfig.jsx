// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence} from "firebase/auth";
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAg49WYXqDd2KIE-9CGK18sRfWylGV7sdY",
  authDomain: "react-native-641dc.firebaseapp.com",
  projectId: "react-native-641dc",
  storageBucket: "react-native-641dc.firebasestorage.app",
  messagingSenderId: "13971151372",
  appId: "1:13971151372:web:7c09139a52e3fdafd22c29",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// export const auth=getAuth(app);

export const auth =  initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

export const db = getFirestore(app);