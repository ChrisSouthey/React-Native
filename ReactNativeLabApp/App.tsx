import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { HomeScreen } from './compenents/HomeScreen';
import { Details } from './compenents/Details';
import { PictureModal } from './compenents/PictureModal';
import { WeatherApp } from './compenents/WeatherApp';
import { createDrawerNavigator } from '@react-navigation/drawer';


interface ImageData {
  id: number;
  url: string;
}

export type StackParamList = {
  Home: undefined;
  Details: { url: string };
  Modal: { url: string };
};

const Stack = createStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator();

function GallaryStack() {
  return (
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
  );
}

const App = () => {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{ 
          headerShown: false, 
          drawerPosition: 'right',
        }}
      >
        <Drawer.Screen
          name="Photo Gallery"
          component={GallaryStack}
        />
        <Drawer.Screen
          name="Weather App"
          component={WeatherApp}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
