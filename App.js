// App.js;

// --------  IMPORTS  ------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Alert, Logbox } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { disableNetwork, enableNetwork } from 'firebase/firestore';
import { useNetInfo } from '@react-native-community/netinfo';
import * as Font from 'expo-font';
import Start from './components/Start';
import Chat from './components/Chat';
import { app, db, auth, storage } from './firebase'; // Importiere die initialisierten Firebase-Objekte
import { getStorage } from 'firebase/storage';

// --------  CREATE-NAVIGATOR  ------------------------------------------------------------
const Stack = createNativeStackNavigator();
// LogBox.ignoreLogs(['AsyncStorage has been extracted from']);

// --------  COMPONENT  ------------------------------------------------------------
const App = () => {
  // VARIABLES
  const connectionStatus = useNetInfo();
  // STATE-VARIABLES
  const [fontsLoaded, setFontsLoaded] = useState(false);

  // CONNECTION
  useEffect(() => {
    if (connectionStatus.isConnected === false) {
      Alert.alert('Connection Lost!!');
      disableNetwork(db);
    } else if (connectionStatus.isConnected === true) {
      enableNetwork(db);
    }
  }, [connectionStatus.isConnected]);

  // FONTS
  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
      'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    });
  };

  useEffect(() => {
    loadFonts().then(() => setFontsLoaded(true));
  }, []);

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  // --------  RENDER-FUNCTION  ------------------------------------------------------------
  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen
          name="Start"
          children={(props) => <Start {...props} auth={auth} />} // Verwende children, um Props zu übergeben
        />
        <Stack.Screen
          name="Chat"
          children={(props) => (
            <Chat
              {...props}
              db={db}
              isConnected={connectionStatus.isConnected}
              storage={storage}
            />
          )}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
