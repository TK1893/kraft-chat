// firebase.js

// --------  IMPORTS  ------------------------------------------------------------
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getStorage } from 'firebase/storage';

// MY-FIREBASE-CONFIGURATION
const firebaseConfig = {
  apiKey: 'AIzaSyCQ8iAt1368S71PnrF2QBUQBHJtRSg-94w',
  authDomain: 'kraft-chat-fc767.firebaseapp.com',
  projectId: 'kraft-chat-fc767',
  storageBucket: 'kraft-chat-fc767.appspot.com',
  messagingSenderId: '698276046754',
  appId: '1:698276046754:web:de349d8092f6833e5874fb',
};

// INITIALIZE-FIREBASE
const app = initializeApp(firebaseConfig);

// INITIALIZE-FIRESTORE
const db = getFirestore(app);

// INITIALIZE-STORAGE-HANDLER
const storage = getStorage(app);

// INITIALIZE-FIRBASE-AUTHENTICATION
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// EXPORTS
export { app, auth, db, storage };
