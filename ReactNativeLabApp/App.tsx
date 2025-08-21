import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator, StackNavigationProp } from '@react-navigation/stack';
import React, { useState } from 'react';
import { HomeScreen } from './compenents/HomeScreen';
import { Details } from './compenents/Details';
import { PictureModal } from './compenents/PictureModal';
import { WeatherApp } from './compenents/WeatherApp';
import ScannerApp from './compenents/ScannerApp';
import BatteryApp from './compenents/BatteryApp';
import ProductDetails from './compenents/scannerApp/ProductDetails';
import Favorites from './compenents//scannerApp/Favorites';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


export type StackParamList = {
  Home: undefined;
  Details: { url: string };
  Modal: { url: string };
};

const Stack = createStackNavigator<StackParamList>();
const Drawer = createDrawerNavigator();
const ShopStack = createStackNavigator();
const ShopTabs = createBottomTabNavigator();

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


function ScannerStack() {
  return (
    <ShopStack.Navigator>
      <ShopStack.Screen
        name="BarCodeScanner"
        options={{ title: 'Scanner' }}
        component={ScannerApp}
      />
      <ShopStack.Screen
        name="ProductDetails"
        options={{ title: 'Product' }}
        component={ProductDetails}
      />
    </ShopStack.Navigator>
  );
}

function ScannerTabs() {
  return (
    <ShopTabs.Navigator screenOptions={{ headerShown: false }}>
      <ShopTabs.Screen
        name="ScannerTab"
        component={ScannerStack}
        options={{ title: 'Scanner' }}
      />
      <ShopTabs.Screen
        name="FavoritesTab"
        component={Favorites}
        options={{ title: 'Favorites' }}
      />
    </ShopTabs.Navigator>
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
        <Drawer.Screen
          name="QR Code Scanner"
          component={ScannerTabs}
        />
        <Drawer.Screen
          name="Battery App"
          component={BatteryApp}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default App;
