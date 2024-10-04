// components\Chat.js
import React, { useState, useEffect } from 'react';
import {
  View,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Text,
} from 'react-native';
import {
  Bubble,
  GiftedChat,
  SystemMessage,
  Day,
} from 'react-native-gifted-chat';
import {
  collection,
  query,
  orderBy,
  addDoc,
  onSnapshot,
} from 'firebase/firestore';

// ****  CHAT COMPONENT  *******************************************
const Chat = ({ navigation, route, db }) => {
  // VARIABLES ------------------------------------------------
  // -- "USER-NAME" & "USER-COLOR" & "USER-ID"(Extraction) --
  const { name, color, userID } = route.params;

  // -- "MESSAGES" STATE-VARIABLE --
  const [messages, setMessages] = useState([]);

  // FUNCTIONS ------------------------------------------------
  // -- "ONSEND" --
  const onSend = (newMessages) => {
    addDoc(collection(db, 'messages'), newMessages[0]);
  };
  // -- "RENDER-BUBBLE" --
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
  // -- "RENDER-SYSTEM-MESSAGE" --
  const renderSystemMessage = (props) => {
    return (
      <SystemMessage
        {...props}
        containerStyle={{
          marginBottom: 15,
        }}
        textStyle={{
          color: '#FFF',
          fontFamily: 'Poppins-Light',
          fontSize: 14,
          // fontWeight: 'bold',
        }}
        dateTextStyle={{
          color: '#FFF',
          fontSize: 12,
        }}
      />
    );
  };
  // -- "RENDER-DAY" --
  const renderDay = (props) => {
    return (
      <Day
        {...props}
        textStyle={{
          color: '#FFF',
          fontFamily: 'Poppins-SemiBold',
          fontSize: 14,
        }}
      />
    );
  };

  // USE-EFFECT HOOKS -----------------------------------------------
  // "REAL-TIME-MESSAGES"
  useEffect(() => {
    navigation.setOptions({ title: name }); // "SET NAVIGATION BAR TITLE"
    const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
    const unsubMessages = onSnapshot(q, (docs) => {
      let newMessages = [];
      docs.forEach((doc) => {
        newMessages.push({
          id: doc.id,
          ...doc.data(),
          createdAt: new Date(doc.data().createdAt.toMillis()),
        });
      });
      setMessages(newMessages);
    });
    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, []);

  // ****  RENDER FUNCTION  **************************************************
  return (
    <View style={[styles.container, { backgroundColor: color }]}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderSystemMessage={renderSystemMessage}
        renderDay={renderDay}
        onSend={(messages) => onSend(messages)}
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

// ****  LAYOUT  ***************************************************************
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Chat;
