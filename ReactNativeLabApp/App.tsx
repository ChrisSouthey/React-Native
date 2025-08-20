import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
  Button,
} from 'react-native';
import { HomeScreen } from './compenents/HomeScreen';
import { Details } from './compenents/Details';
import { PictureModal } from './compenents/PictureModal';


interface ImageData {
  id: number;
  url: string;
}

export type StackParamList = {
  Home: undefined;
  Details: { url: string };
  Modal: { url: string};
};

const Stack = createStackNavigator<StackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          options={{ headerShown: true }}
          component={HomeScreen}
        />
        <Stack.Screen
          name="Details"
          options={({ route }) => ({
            title: route.params.url
          })}
          component={Details}
        />
        <Stack.Screen
          name="Modal"
          options={({ route }) => ({
            title: route.params.url,
            presentation: 'modal',
            headerTitleStyle: { color: '#000' },
            headerStyle: { backgroundColor: '#000' },
            headerTintColor: '#ffffff',
            headerBackTitle: 'Go Back',
          })}
          component={PictureModal}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
