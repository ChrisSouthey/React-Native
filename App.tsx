import React from 'react';
import { SafeAreaView, StyleSheet, Text } from 'react-native';
import ContactList from './components/ContactList'

const CONTACTS = [
  {
    id: '1',
    name: 'Dennis',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: '2',
    name: 'Sweet Dee',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: '3',
    name: 'Frank',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
  {
    id: '4',
    name: 'Mac',
    image: 'https://reactnative.dev/img/tiny_logo.png',
  },
];

const App = () => {
  return (
    <SafeAreaView style={{flex:1, marginTop:20}}>
      <Text>hello</Text>
      <ContactList contacts={CONTACTS} />
    </SafeAreaView>
  );
};

export default App;