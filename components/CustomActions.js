// components\CustomActions.js

// --------  IMPORTS  ------------------------------------------------------------
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, Alert } from 'react-native';
import { useActionSheet } from '@expo/react-native-action-sheet';
import * as ImagePicker from 'expo-image-picker';
import * as Location from 'expo-location';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

// --------  COMPONENT  ------------------------------------------------------------
const CustomActions = ({
  wrapperStyle,
  iconTextStyle,
  onSend,
  user,
  storage,
  userID,
}) => {
  const actionSheet = useActionSheet();

  // ON-ACTION-PRESS
  const onActionPress = () => {
    const options = [
      'Choose From Library',
      'Take Picture',
      'Send Location',
      'Cancel',
    ];
    const cancelButtonIndex = options.length - 1;
    actionSheet.showActionSheetWithOptions(
      {
        options,
        cancelButtonIndex,
      },
      async (buttonIndex) => {
        switch (buttonIndex) {
          case 0:
            pickImage();
            return;
          case 1:
            takePhoto();
            return;
          case 2:
            getLocation();
          default:
        }
      }
    );
  };

  // UPLOAD-AND-SEND-IMAGE
  const uploadAndSendImage = async (imageURI) => {
    const uniqueRefString = generateReference(imageURI);
    const newUploadRef = ref(storage, uniqueRefString);
    const response = await fetch(imageURI);
    const blob = await response.blob();
    uploadBytes(newUploadRef, blob).then(async (snapshot) => {
      const imageURL = await getDownloadURL(snapshot.ref);
      onSend([
        {
          _id: new Date().getTime(), // Unique ID for the message
          image: imageURL, // The image URL
          createdAt: new Date(), // Timestamp for the message
          text: '', // No text, since it's an image message
          user: {
            _id: user._id, // User ID
            name: user.name, // User name
          },
        },
      ]);
    });
  };

  // PICK-IMAGE
  const pickImage = async () => {
    let permissions = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchImageLibraryAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  // TAKE-PHOTO
  const takePhoto = async () => {
    let permissions = await ImagePicker.requestCameraPermissionsAsync();
    if (permissions?.granted) {
      let result = await ImagePicker.launchCameraAsync();
      if (!result.canceled) await uploadAndSendImage(result.assets[0].uri);
      else Alert.alert("Permissions haven't been granted.");
    }
  };

  // GET-LOCATION
  const getLocation = async () => {
    let permissions = await Location.requestForegroundPermissionsAsync();
    if (permissions?.granted) {
      const location = await Location.getCurrentPositionAsync({});
      if (location) {
        // Volles Nachrichtenobjekt mit Standortdaten erstellen
        onSend([
          {
            location: {
              longitude: location.coords.longitude,
              latitude: location.coords.latitude,
            },
            text: '', // Leeres Textfeld für eine Standortnachricht
            createdAt: new Date(),
            user: {
              _id: user._id,
              name: user.name,
            },
          },
        ]);
      } else {
        Alert.alert('Error occurred while fetching location');
      }
    } else {
      Alert.alert(`Permissions haven't been granted.`);
    }
  };

  // GENERATE-IMAGE-REFERENCE
  const generateReference = (uri) => {
    const timeStamp = new Date().getTime();
    const imageName = uri.split('/')[uri.split('/').length - 1];
    return `${userID}-${timeStamp}-${imageName}`;
  };

  // --------  RENDER-FUNCTION  ------------------------------------------------------------
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onActionPress}
      accessible={true}
      accessibilityLabel="More Options"
      accessibilityHint="Opens a menu with options to send a photo or your current location."
      accessibilityRole="Button"
    >
      <View style={[styles.wrapper, wrapperStyle]}>
        <Text style={[styles.iconText, iconTextStyle]}>+</Text>
      </View>
    </TouchableOpacity>
  );
};

// --------  LAYOUT  ------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    width: 26,
    height: 26,
    marginLeft: 10,
    marginBottom: 10,
  },
  wrapper: {
    borderRadius: 13,
    borderColor: '#b2b2b2',
    borderWidth: 2,
    flex: 1,
  },
  iconText: {
    color: '#b2b2b2',
    fontWeight: 'bold',
    fontSize: 16,
    backgroundColor: 'transparent',
    textAlign: 'center',
  },
});

export default CustomActions;
