import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import "firebase/database";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyCLd6BGo6Z9Pp0uGt5QYVMrAwbhATkeyrU",
  authDomain: "siga-software.firebaseapp.com",
  databaseURL: "https://siga-software-default-rtdb.firebaseio.com",
  projectId: "siga-software",
  storageBucket: "siga-software.appspot.com",
  messagingSenderId: "8997314242",
  appId: "1:8997314242:web:7e56efc01d37dfd407255b",
  measurementId: "G-NY2ERQ4G33",
  
};

const app = initializeApp(firebaseConfig);

let analytics;

if (typeof window !== 'undefined') {
 analytics = getAnalytics(app);
}


const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { analytics, app, auth, db, firebaseConfig, storage };



// Initialize Firebase