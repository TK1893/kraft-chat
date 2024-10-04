// App.js
import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import Start from './components/Start';
import Chat from './components/Chat';
import { app, db, auth } from './firebase'; // Importiere die initialisierten Firebase-Objekte

// Erstelle den Navigator
const Stack = createNativeStackNavigator();

const App = () => {
  // FONTS ------------------------------------------------------------------------------
  const loadFonts = async () => {
    await Font.loadAsync({
      'Poppins-Light': require('./assets/fonts/Poppins-Light.ttf'),
      'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
      'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
      'Poppins-Bold': require('./assets/fonts/Poppins-Bold.ttf'),
    });
  };

  const [fontsLoaded, setFontsLoaded] = useState(false);

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

  // RENDER FUNCTION -------------------------------------------------------------------
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
          children={(props) => <Chat {...props} db={db} />} // Verwende children, um Props zu übergeben
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
