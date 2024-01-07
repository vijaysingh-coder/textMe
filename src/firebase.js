// Import the functions you need from the SDKs you need
import dotenv from 'dotenv';
dotenv.config();

import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from 'firebase/analytics';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.Firebase_Aki_Key,
  authDomain: 'webchat-976cf.firebaseapp.com',
  projectId: 'webchat-976cf',
  storageBucket: 'webchat-976cf.appspot.com',
  messagingSenderId: '980981034181',
  appId: '1:980981034181:web:72e004622fba0549d814ac',
  measurementId: 'G-98RWYN9QR4',
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
export const analytics = getAnalytics(app);
