// // components\Chat.js
// import React, { useState, useEffect } from 'react';
// import {
//   View,
//   StyleSheet,
//   KeyboardAvoidingView,
//   Platform,
//   Text,
// } from 'react-native';
// import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
// import {
//   collection,
//   query,
//   orderBy,
//   addDoc,
//   onSnapshot,
// } from 'firebase/firestore';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import CustomActions from './CustomActions';
// import MapView from 'react-native-maps';

// // ****  CHAT COMPONENT  *******************************************
// const Chat = ({ navigation, route, db, isConnected }) => {
//   // VARIABLES ------------------------------------------------
//   // -- "USER-NAME" & "USER-COLOR" & "USER-ID"(Extraction) --
//   const { name, color, userID } = route.params;
//   const [messages, setMessages] = useState([]);

//   // "REAL-TIME-MESSAGES"
//   let unsubMessages;
//   useEffect(() => {
//     navigation.setOptions({ title: name }); // "SET NAVIGATION BAR TITLE"
//     if (isConnected === true) {
//       // unregister current onSnapshot() listener to avoid registering multiple listeners when
//       // useEffect code is re-executed.
//       if (unsubMessages) unsubMessages();
//       unsubMessages = null;

//       const q = query(collection(db, 'messages'), orderBy('createdAt', 'desc'));
//       unsubMessages = onSnapshot(q, (docs) => {
//         let newMessages = [];
//         docs.forEach((doc) => {
//           newMessages.push({
//             id: doc.id,
//             ...doc.data(),
//             createdAt: new Date(doc.data().createdAt.toMillis()),
//           });
//         });
//         cacheMessages(newMessages);
//         setMessages(newMessages);
//       });
//     } else loadCachedMessages();

//     // Clean up code
//     return () => {
//       if (unsubMessages) unsubMessages();
//     };
//   }, [isConnected]);

//   // FUNCTIONS ------------------------------------------------
//   // -- "ONSEND" --
//   const onSend = (newMessages) => {
//     addDoc(collection(db, 'messages'), newMessages[0]);
//   };

//   // -- "RENDER-BUBBLE" --
//   const renderBubble = (props) => {
//     return (
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: '#000',
//           },
//           left: {
//             backgroundColor: '#FFF',
//           },
//         }}
//         textStyle={{
//           right: {
//             color: '#FFF',
//             fontFamily: 'Poppins-Regular',
//           },
//           left: {
//             color: '#000',
//             fontFamily: 'Poppins-Regular',
//           },
//         }}
//         timeTextStyle={{
//           right: {
//             color: '#FFF',
//             fontFamily: 'Poppins-Light',
//           },
//           left: {
//             color: '#000',
//             fontFamily: 'Poppins-Light',
//           },
//         }}
//       />
//     );
//   };

//   // -- "RENDER-INPUT-TOOLBAR" --
//   const renderInputToolbar = (props) => {
//     if (isConnected) return <InputToolbar {...props} />;
//     else return null;
//   };

//   //LOAD-CACHED-MESSAGES
//   const loadCachedMessages = async () => {
//     const cachedMessages = (await AsyncStorage.getItem('c_messages')) || [];
//     setMessages(JSON.parse(cachedMessages));
//   };

//   //SET-CACH-MESSAGES
//   const cacheMessages = async (messagesToCache) => {
//     try {
//       await AsyncStorage.setItem('c_messages', JSON.stringify(messagesToCache));
//     } catch (error) {
//       console.log(error.message);
//     }
//   };

//   // RENDER-CUSTOM-ACTIONS (CREATING-CIRCLE-BUTTON)
//   // const renderCustomActions = (props) => {
//   //   return <CustomActions {...props} />;
//   // };
//   const renderCustomActions = (props) => {
//     return <CustomActions onSend={onSend} {...props} />;
//   };

//   // RENDER-CUSTOM-VIEW (Check: currentMessage contains location data?)
//   const renderCustomView = (props) => {
//     const { currentMessage } = props;
//     if (currentMessage.location) {
//       return (
//         <MapView
//           style={{ width: 150, height: 100, borderRadius: 13, margin: 3 }}
//           region={{
//             latitude: currentMessage.location.latitude,
//             longitude: currentMessage.location.longitude,
//             latitudeDelta: 0.0922,
//             longitudeDelta: 0.0421,
//           }}
//         />
//       );
//     }
//     return null;
//   };

//   // ****  RENDER FUNCTION  **************************************************
//   return (
//     <View style={[styles.container, { backgroundColor: color }]}>
//       <GiftedChat
//         messages={messages}
//         renderBubble={renderBubble}
//         renderInputToolbar={renderInputToolbar}
//         onSend={(messages) => onSend(messages)}
//         // renderCustomActions={renderCustomActions}
//         renderActions={renderCustomActions}
//         renderCustomView={renderCustomView}
//         user={{
//           _id: userID, // Benutzer-ID dynamisch vom aktuell angemeldeten Benutzer
//           name: name, // Optional: Benutzername übergeben
//         }}
//       />
//       {Platform.OS === 'android' ? (
//         <KeyboardAvoidingView behavior="height" />
//       ) : null}
//     </View>
//   );
// };

// // ****  LAYOUT  ***************************************************************
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//   },
// });

// export default Chat;

import { useState, useEffect } from 'react';
import { StyleSheet, View, Platform, KeyboardAvoidingView } from 'react-native';
import { Bubble, GiftedChat, InputToolbar } from 'react-native-gifted-chat';
import {
  collection,
  addDoc,
  onSnapshot,
  query,
  orderBy,
} from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MapView from 'react-native-maps';
import CustomActions from './CustomActions';

const Chat = ({ db, route, navigation, isConnected }) => {
  const [messages, setMessages] = useState([]);
  const { name, userID } = route.params;

  let unsubMessages;

  useEffect(() => {
    navigation.setOptions({ title: name });

    if (isConnected === true) {
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

    return () => {
      if (unsubMessages) unsubMessages();
    };
  }, [isConnected]);

  const loadCachedMessages = async () => {
    const cachedMessages = (await AsyncStorage.getItem('messages')) || [];
    setMessages(JSON.parse(cachedMessages));
  };

  const cacheMessages = async (messagesToCache) => {
    try {
      await AsyncStorage.setItem('messages', JSON.stringify(messagesToCache));
    } catch (error) {
      console.log(error.message);
    }
  };

  // const onSend = (newMessages) => {
  //   addDoc(collection(db, 'messages'), newMessages[0]);
  // };
  const onSend = (newMessages = []) => {
    const message = newMessages[0]; // Nimm die erste Nachricht aus dem Array

    // Sicherstellen, dass das Nachrichtenformat korrekt ist, bevor es an Firestore gesendet wird
    const messageToSend = {
      _id: message._id || new Date().getTime(), // Eindeutige ID generieren
      text: message.text || '', // Text kann bei Standortnachrichten leer sein
      createdAt: message.createdAt || new Date(),
      user: message.user || { _id: userID, name }, // Sicherstellen, dass das User-Objekt gesetzt ist
      location: message.location || null, // Standortdaten hinzufügen, falls vorhanden
    };

    addDoc(collection(db, 'messages'), messageToSend);
  };

  const renderInputToolbar = (props) => {
    if (isConnected === true) return <InputToolbar {...props} />;
    else return null;
  };

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
      />
    );
  };

  const renderCustomActions = (props) => {
    return (
      <CustomActions onSend={onSend} user={{ _id: userID, name }} {...props} />
    );
  };

  const renderCustomView = (props) => {
    const { currentMessage } = props;
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
    return null;
  };

  return (
    <View style={styles.container}>
      <GiftedChat
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        renderActions={renderCustomActions}
        renderCustomView={renderCustomView}
        user={{
          _id: userID,
          name,
        }}
      />

      {Platform.OS === 'android' ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  logoutButton: {
    position: 'absolute',
    right: 0,
    top: 0,
    backgroundColor: '#C00',
    padding: 10,
    zIndex: 1,
  },
  logoutButtonText: {
    color: '#FFF',
    fontSize: 10,
  },
});

export default Chat;
