// Start.js
import React, { useState } from 'react';
import {
  Alert,
  View,
  TextInput,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Platform,
  KeyboardAvoidingView,
} from 'react-native';
import { signInAnonymously, signOut } from 'firebase/auth';

const Start = ({ navigation, auth }) => {
  // VARIABLES ----
  const image = require('../assets/images/BGI_01.jpg');
  // STATE-VARIABLES ----
  const [name, setName] = useState('');
  const [color, setColor] = useState('');

  // FUNCTIONS -----------------------------------------------------------
  // const signInUser = () => {
  //   signInAnonymously(auth)
  //     .then((result) => {
  //       navigation.navigate('Chat', {
  //         userID: result.user.uid,
  //         name: name,
  //         color: color,
  //       });
  //       Alert.alert('Signed in Successfully!');
  //     })
  //     .catch((error) => {
  //       Alert.alert('Unable to sign in, try later again.');
  //     });
  // };

  const signInUser = () => {
    // Zuerst alle bestehenden Anmeldungen abmelden
    signOut(auth)
      .then(() => {
        // Dann den Benutzer erneut anonym anmelden
        signInAnonymously(auth)
          .then((result) => {
            navigation.navigate('Chat', {
              userID: result.user.uid,
              name: name,
              color: color,
            });
            Alert.alert('Signed in Successfully!');
          })
          .catch((error) => {
            Alert.alert('Unable to sign in, try again later.');
          });
      })
      .catch((error) => {
        console.log('Sign out error:', error);
      });
  };

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
            placeholderTextColor="rgba(75, 138, 144, 0.5)"
          />
          {/* FARBWAHL */}
          <Text style={styles.colorChoiceText}>Choose Background Color:</Text>
          {/* FARBKREISE */}
          <View style={styles.circleContainer}>
            <TouchableOpacity
              style={[
                styles.circle,
                { backgroundColor: '#7a3c5e' },
                color === '#7a3c5e' && styles.selectedCircle,
              ]}
              onPress={() => setColor('#7a3c5e')}
            />
            <TouchableOpacity
              style={[
                styles.circle,
                { backgroundColor: '#ffc090' },
                color === '#ffc090' && styles.selectedCircle,
              ]}
              onPress={() => setColor('#ffc090')}
            />
            <TouchableOpacity
              style={[
                styles.circle,
                { backgroundColor: '#fe9dae' },
                color === '#fe9dae' && styles.selectedCircle,
              ]}
              onPress={() => setColor('#fe9dae')}
            />
            <TouchableOpacity
              style={[
                styles.circle,
                { backgroundColor: '#84cbcf' },
                color === '#84cbcf' && styles.selectedCircle,
              ]}
              onPress={() => setColor('#84cbcf')}
            />
          </View>
          {/* BUTTON */}
          <TouchableOpacity style={styles.chatButton} onPress={signInUser}>
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
    fontFamily: 'Poppins-Bold',
    textShadowColor: 'rgba(0, 0, 0, 0.5)', // Dark shadow color for depth
    textShadowOffset: { width: 2, height: 2 }, // Adds offset for the shadow
    textShadowRadius: 5, // Adds a blur to the shadow
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 10 }, // Vertical shadow
    shadowOpacity: 0.2, // Higher opacity for strong shadow
    shadowRadius: 10, // Soft shadow radius
    elevation: 10, // Android shadow
  },
  // **  MAIN CONTAINER  **************************************
  container: {
    position: 'absolute', // Position it independently
    bottom: 0, // Align to the bottom of the screen
    justifyContent: 'space-evenly',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    height: '44%',
    width: '88%',
    // Border & Box-Shadow
    borderWidth: 1,
    borderColor: 'rgba(75, 138, 144,0.2)',
    borderRadius: 10,
    marginBottom: 30,
  },
  // **  TEXT-INPUT  *****************************************
  textInput: {
    color: '#4b8a90',
    width: '88%',
    padding: 15,
    borderWidth: 1,
    borderColor: '#4b8a90',
    borderRadius: 5,
    fontFamily: 'Poppins-Light',
    fontSize: 16,
    marginBottom: 20, // Abstand unter dem TextInput
  },
  // **  COLOR-CHOICE-SECTION  *******************************
  // TEXT COLOR CHOICE
  colorChoiceText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: '#4b8a90',
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
    borderColor: '#FFD700',
  },
  // **  CHAT-BUTTON  ************************************
  chatButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '88%',
    height: 60,
    backgroundColor: '#4b8a90',
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

export default Start;
