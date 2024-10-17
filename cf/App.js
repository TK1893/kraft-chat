// // App.js
// import React, { useState, useEffect } from 'react';
// import { View, ActivityIndicator, Alert, Logbox } from 'react-native';
// import { StatusBar } from 'expo-status-bar';
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import { disableNetwork, enableNetwork } from 'firebase/firestore';
// import { useNetInfo } from '@react-native-community/netinfo';
// import * as Font from 'expo-font';
// import Start from './components/Start';
// import Chat from './components/Chat';
// import { app, db, auth } from './firebase'; // Importiere die initialisierten Firebase-Objekte

// // Erstelle den Navigator
// const Stack = createNativeStackNavigator();
// // LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

// const App = () => {
//   const connectionStatus = useNetInfo();
//   // const [isConnected, setIsConnected] = useState(connectionStatus.isConnected);

//   useEffect(() => {
//     if (connectionStatus.isConnected === false) {
//       Alert.alert('Connection Lost!!');
//       disableNetwork(db);
//     } else if (connectionStatus.isConnected === true) {
//       enableNetwork(db);
//     }
//   }, [connectionStatus.isConnected]);

//   // FONTS ------------------------------------------------------------------------------
//   const loadFonts = async () => {
//     await Font.loadAsync({
//       'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
//       'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
//       'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
//       'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
//     });
//   };

//   const [fontsLoaded, setFontsLoaded] = useState(false);

//   useEffect(() => {
//     loadFonts().then(() => setFontsLoaded(true));
//   }, []);

//   if (!fontsLoaded) {
//     return (
//       <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
//         <ActivityIndicator size="large" color="#0000ff" />
//       </View>
//     );
//   }

//   // RENDER FUNCTION -------------------------------------------------------------------
//   return (
//     <NavigationContainer>
//       <StatusBar style="auto" />
//       <Stack.Navigator initialRouteName="Start">
//         <Stack.Screen
//           name="Start"
//           children={(props) => <Start {...props} auth={auth} />} // Verwende children, um Props zu übergeben
//         />
//         <Stack.Screen
//           name="Chat"
//           children={(props) => (
//             <Chat
//               {...props}
//               db={db}
//               isConnected={connectionStatus.isConnected}
//             />
//           )} // Verwende children, um Props zu übergeben
//         />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default App;

// import the screens
import Start from './components/Start';
import Chat from './components/Chat';

// import react Navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import functions for initializing firestore
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  disableNetwork,
  enableNetwork,
} from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { useNetInfo } from '@react-native-community/netinfo';
import { useEffect } from 'react';
import { Alert, LogBox } from 'react-native';

// Create the navigator
const Stack = createNativeStackNavigator();

LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

const App = () => {
  const connectionStatus = useNetInfo();

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

  // Initialize Firestore Database handler
  const db = getFirestore(app);

  // Initialize Firebase Storage handler
  const storage = getStorage(app);

  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat">
          {(props) => (
            <Chat
              isConnected={connectionStatus.isConnected}
              db={db}
              storage={storage}
              {...props}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
