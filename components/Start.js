// components\Start.js
import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';

// ****  START COMPONENT  *******************************************
const Start = ({ navigation }) => {
  // VARIABLES ----
  const image = require('../assets/Background Image.png'); // Correct way to import the image

  // STATE-VARIABLES ----
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  // ****  RENDER FUNCTION  **************************************************
  return (
    <View style={styles.wrapper}>
      <ImageBackground source={image} resizeMode="cover" style={styles.image}>
        {/* TITLE CONTAINER */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>KraftChat</Text>
        </View>

        {/* MAIN CONTAINER */}
        <View style={styles.container}>
          {/* TEXT-INPUT */}
          <TextInput
            style={styles.textInput}
            value={name}
            onChangeText={setName}
            placeholder="Your Name"
            placeholderTextColor="rgba(117, 112, 131, 0.5)"
          />
          {/* FARBWAHL */}
          <Text style={styles.colorChoiceText}>Choose Background Color:</Text>
          {/* FARBKREISE */}
          <View style={styles.circleContainer}>
            <TouchableOpacity
              style={[
                styles.circle,
                { backgroundColor: '#090C08' },
                color === '#090C08' && styles.selectedCircle, // Apply border if selected
              ]}
              onPress={() => setColor('#090C08')}
            />
            <TouchableOpacity
              style={[
                styles.circle,
                { backgroundColor: '#474056' },
                color === '#474056' && styles.selectedCircle, // Apply border if selected
              ]}
              onPress={() => setColor('#474056')}
            />
            <TouchableOpacity
              style={[
                styles.circle,
                { backgroundColor: '#8A95A5' },
                color === '#8A95A5' && styles.selectedCircle, // Apply border if selected
              ]}
              onPress={() => setColor('#8A95A5')}
            />
            <TouchableOpacity
              style={[
                styles.circle,
                { backgroundColor: '#B9C6AE' },
                color === '#B9C6AE' && styles.selectedCircle, // Apply border if selected
              ]}
              onPress={() => setColor('#B9C6AE')}
            />
          </View>
          {/* BUTTON */}
          <TouchableOpacity
            style={styles.chatButton}
            onPress={() =>
              navigation.navigate('Chat', { name: name, color: color })
            }
          >
            <Text style={styles.chatButtonText}>Start Chatting</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
      {Platform.OS === 'ios' ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null}
    </View>
  );
};

// ****  LAYOUT  ***************************************************************
const styles = StyleSheet.create({
  // **  WRAPPER  ********************************************
  wrapper: {
    flex: 1, // Wrapper takes the full screen
  },
  // **  BACKGROUND IMAGE  ***********************************
  image: {
    flex: 1, // Image takes the full screen
    justifyContent: 'center',
    alignItems: 'center',
  },
  // **  TITLE  **********************************************
  titleContainer: {
    position: 'absolute', // Make the title independent of the other content
    top: 50, // Vertical positioning
    width: '100%',
    alignItems: 'center', // Center horizontally
  },
  title: {
    fontSize: 45,
    color: '#FFFFFF',
    fontFamily: 'Poppins-SemiBold',
  },
  // **  MAIN CONTAINER  **************************************
  container: {
    position: 'absolute', // Position it independently
    bottom: 0, // Align to the bottom of the screen
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'white',
    height: '44%', // Adjust height as needed
    width: '88%',
    // Border & Box-Shadow
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    borderRadius: 10,
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 }, // Increased height for stronger vertical shadow
    shadowOpacity: 0.6, // More opacity for a bolder shadow
    shadowRadius: 20, // Softer, larger radius
    elevation: 12, // Higher elevation for stronger shadow on Android
  },
  // **  TEXT-INPUT  *****************************************
  textInput: {
    width: '88%',
    padding: 15,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 5,
    fontFamily: 'Poppins-Light', // use custom font for input text
    fontSize: 16,
    marginBottom: 20, // Abstand unter dem TextInput
  },
  // **  COLOR-CHOICE-SECTION  *******************************
  // TEXT COLOR CHOICE
  colorChoiceText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#757083',
  },
  // CIRCLE CONTAINER
  circleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '88%',
  },
  // CIRCLE
  circle: {
    width: 40,
    height: 40,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // for Android shadow
  },
  // SELECTED CIRCLE
  selectedCircle: {
    borderWidth: 3,
    borderColor: '#FFD700', // Gold or any color you prefer for the border
  },
  // **  CHAT-BUTTON  ************************************
  chatButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '88%',
    height: 60,
    backgroundColor: '#757083',
    borderRadius: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5, // for Android shadow
  },
  chatButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Poppins-SemiBold',
  },
});

// Make this component available to the app
export default Start;
