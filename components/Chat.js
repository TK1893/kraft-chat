import React, { Component } from 'react';
import { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';

// create a component
const Chat = ({ navigation, route }) => {
  // Extraction User-Name & User-Color
  const { name, color } = route.params;
  // Destructured version of:
  // const name = route.params.name;
  // const color = route.params.color;

  // Setting Title of Navigation Bar
  useEffect(() => {
    navigation.setOptions({ title: name });
  }, []);

  return (
    //Container
    <View style={[styles.container, { backgroundColor: color }]}>
      <Text style={styles.title}> Chat Party !</Text>
    </View>
  );
};

// LAYOUT
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontFamily: 'Poppins-Bold',
    color: '#ffffff',
    fontSize: 40,
  },
});

//make this component available to the app
export default Chat;
