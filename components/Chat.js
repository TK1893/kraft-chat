// components\Chat.js

// --------  IMPORTS  ------------------------------------------------------------
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Image,
} from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import {
  collection,
  query,
  orderBy,
  addDoc,
  onSnapshot,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomActions from './CustomActions';
import MapView from 'react-native-maps';

// --------  COMPONENT  ------------------------------------------------------------
const Chat = ({ navigation, route, db, isConnected, storage }) => {
  // VARIABLES
  const { name, color, userID, user } = route.params; // Extraction
  // STATE-VARIABLES
  const [messages, setMessages] = useState([]);

  // REAL-TIME-MESSAGES
  let unsubMessages;
  useEffect(() => {
    navigation.setOptions({ title: name }); // "SET NAVIGATION BAR TITLE"
    if (isConnected === true) {
      // unregister current onSnapshot() listener to avoid registering multiple listeners when
      // useEffect code is re-executed.
      if (unsubMessages) unsubMessages();
      unsubMessages = null;

      const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));

      unsubMessages = onSnapshot(q, (docs) => {
        let newMessages = [];
        docs.forEach((doc) => {
          newMessages.push({
            id: doc.id,
            ...doc.data(),
            createdAt: new Date(doc.data().createdAt.toMillis()),
          });
        });
        cacheMessages(newMessages);
        setMessages(newMessages);
      });
    } else loadCachedMessages();

    // Clean up code
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  // ONSEND
  const onSend = (newMessages = []) => {
    const message = newMessages[0]; // Nimm die erste Nachricht aus dem Array
    // Sicherstellen, dass das Nachrichtenformat korrekt ist, bevor es an Firestore gesendet wird
    const messageToSend = {
      _id: message._id || new Date().getTime(), // Eindeutige ID generieren
      text: message.text || '', // Text kann bei Standortnachrichten leer sein
      createdAt: message.createdAt || new Date(),
      user: message.user || { _id: userID, name }, // Sicherstellen, dass das User-Objekt gesetzt ist
      image: message.image || null, // Bild-URL falls vorhanden
      location: message.location || null, // Standortdaten hinzufügen, falls vorhanden
    };

    addDoc(collection(db, 'messages'), messageToSend);
  };

  // RENDER-BUBBLE
  const renderBubble = (props) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: '#000',
          },
          left: {
            backgroundColor: '#FFF',
          },
        }}
        textStyle={{
          right: {
            color: '#FFF',
            fontFamily: 'Poppins-Regular',
          },
          left: {
            color: '#000',
            fontFamily: 'Poppins-Regular',
          },
        }}
        timeTextStyle={{
          right: {
            color: '#FFF',
            fontFamily: 'Poppins-Light',
          },
          left: {
            color: '#000',
            fontFamily: 'Poppins-Light',
          },
        }}
      />
    );
  };

  // RENDER-INPUT-TOOLBAR
  const renderInputToolbar = (props) => {
    if (isConnected) return <InputToolbar {...props} />;
    else return null;
  };

  // LOAD-CACHED-MESSAGES
  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('c_messages')) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  // SET-MESSAGES-TO-CACHE
  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('c_messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // RENDER-CUSTOM-ACTIONS
  const renderCustomActions = (props) => {
    return (
      <CustomActions
        storage={storage}
        onSend={onSend}
        user={{ _id: userID, name }}
        {...props}
      />
    );
  };

  // RENDER-CUSTOM-VIEWS (for Messages with location or image data)
  const renderCustomView = (props) => {
    const { currentMessage } = props;

    // MESSAGE-WITH LOCATION-DATA?
    if (currentMessage.location) {
      return (
        <MapView
          style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
          region={{
            latitude: currentMessage.location.latitude,
            longitude: currentMessage.location.longitude,
            latitudeDelta: 0.0922,
            longitudeDelta: 0.0421,
          }}
        />
      );
    }

    // MESSAGE-WITH IMAGE-DATA?
    if (currentMessage.image) {
      return (
        <View style={{ padding: 5 }}>
          <Image
            source={{ uri: currentMessage.image }}
            style={{ width: 200, height: 150, borderRadius: 13, margin: 3 }}
          />
        </View>
      );
    }
    return null;
  };

  // --------  RENDER-FUNCTION  ------------------------------------------------------------
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        renderMessageImage={() => null}
        user={{
          _id: userID, // Benutzer-ID dynamisch vom aktuell angemeldeten Benutzer
          name: name, // Optional: Benutzername übergeben
        }}
      />
      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

// --------  LAYOUT  ------------------------------------------------------------
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
