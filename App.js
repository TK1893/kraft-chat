// App.js
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import Start from './components/Start';
import Chat from './components/Chat';
// Import Firebase
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Create the navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // FONTS ------------------------------------------------------------------------------
  // FUNCTION TO LOAD FONTS
  const loadFonts = async () => {
    await Font.loadAsync({
      // LIGHT: font-weight: 300
      'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
      // REGULAR: font-weight: 400
      'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
      // SEMIBOLD: font-weight: 600
      'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
      // BOLD: font-weight: 700
      'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    });
  };
  // "FONTS-LOADED" STATE-VARIABLE
  const [fontsLoaded, setFontsLoaded] = useState(false);
  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);
  // If fonts are not loaded, return a loading indicator
  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // FIREBASE & FIRESTORE ----------------------------------------------------------------
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
  // db Object
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(app);

  // RENDER FUNCTION -------------------------------------------------------------------
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => <Chat db={db} {...props} />}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
