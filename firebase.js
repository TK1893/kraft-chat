// firebase.js
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Your App's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCQ8iAt1368S71PnrF2QBUQBHJtRSg-94w',
  authDomain: 'kraft-chat-fc767.firebaseapp.com',
  projectId: 'kraft-chat-fc767',
  storageBucket: 'kraft-chat-fc767.appspot.com',
  messagingSenderId: '698276046754',
  appId: '1:698276046754:web:de349d8092f6833e5874fb',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

// Initialize Firebase Authentication
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Export app, auth, and db
export { app, auth, db };
