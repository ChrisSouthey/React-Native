import React from 'react';
import { View, Text, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { useWeather } from '../hooks/useWeather';

export const CurrentWeather = () => {
    const { weather, loading } = useWeather('current');

    if (loading) {
        return <ActivityIndicator size="large" />;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.location}>
                {weather.location.name}, {weather.location.region}
            </Text>
            <Image
                source={{ uri: `https:${weather.current.condition.icon}` }}
                style={styles.icon}
            />
            <Text style={styles.condition}>{weather.current.condition.text}</Text>
            <Text style={styles.temp}>{weather.current.temp_f}°</Text>
            <Text>Feels like: {weather.current.feelslike_f}°</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: { alignItems: 'center', marginTop: 50, paddingTop: 50 },
    location: { fontSize: 20, fontWeight: 'bold' },
    icon: { width: 100, height: 100 },
    condition: { fontSize: 18, marginVertical: 5 },
    temp: { fontSize: 40 },
});
