import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer'
import { CurrentWeather } from './weatherApp/CurentWeather';
import { Forecast } from './weatherApp/Forcast';

const WeatherDrawer = createDrawerNavigator();

export const WeatherApp = () => {
    return (
        <WeatherDrawer.Navigator
            initialRouteName="Current Weather"
            screenOptions={{
                drawerPosition: 'left',
                headerShown: false
            }}
        >
            <WeatherDrawer.Screen name="Current Weather" component={CurrentWeather}/>
            <WeatherDrawer.Screen name="Forcast" component={() => <Forecast days={7}/>}/>

        </WeatherDrawer.Navigator>
    );
};