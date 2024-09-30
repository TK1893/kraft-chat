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

// ****  CHAT COMPONENT  *******************************************
const Chat = ({ navigation, route }) => {
  // VARIABLES ------------------------------------------------
  // -- "USER-NAME" & "USER-COLOR" (Extraction) --
  const { name, color } = route.params;

  // -- "MESSAGES" STATE-VARIABLE --
  const [messages, setMessages] = useState([]);

  // FUNCTIONS ------------------------------------------------
  // -- "ONSEND" --
  const onSend = (newMessages) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );
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
  // "SET STATIC MESSAGES"
  useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: 'Hello developer',
        createdAt: new Date(),
        user: {
          _id: 2,
          name: 'React Native',
          avatar: 'https://placeimg.com/140/140/any',
        },
      },
      {
        _id: 2,
        text: `${name} has entered the chat room`,
        createdAt: new Date(),
        system: true,
      },
    ]);
  }, []);

  // "SET NAVIGATION BAR TITLE"
  useEffect(() => {
    navigation.setOptions({ title: name });
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
          _id: 1,
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
