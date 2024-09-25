// // import the screens
// import Start from './components/Start';
// import Chat from './components/Chat';
// // import react Navigation
// import { NavigationContainer } from '@react-navigation/native';
// import { createNativeStackNavigator } from '@react-navigation/native-stack';

// // Create the navigator
// const Stack = createNativeStackNavigator();

// const App = () => {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Start">
//         <Stack.Screen name="Start" component={Start} />
//         <Stack.Screen name="Chat" component={Chat} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native'; // Import ActivityIndicator
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font';
import Start from './components/Start';
import Chat from './components/Chat';

// Create the navigator
const Stack = createNativeStackNavigator();

// Function to load fonts
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

const App = () => {
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

  return (
    <NavigationContainer>
      <StatusBar style="auto" />
      <Stack.Navigator initialRouteName="Start">
        <Stack.Screen name="Start" component={Start} />
        <Stack.Screen name="Chat" component={Chat} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
