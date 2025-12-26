import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAI0YTDrKlChQbN--BuRhA13YIJaf-V8J0",
  authDomain: "billsplit-plus.firebaseapp.com",
  projectId: "billsplit-plus",
  storageBucket: "billsplit-plus.firebasestorage.app",
  messagingSenderId: "1007195512820",
  appId: "1:1007195512820:web:81bab8d080aefbc74023a1",
  measurementId: "G-Y6SKW8XXEC"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Note: Firebase Storage is not enabled - using local image storage instead
// Images are stored locally on device, which is FREE and works without Storage
