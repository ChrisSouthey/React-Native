import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';
import { useWeather } from '../hooks/useWeather';

interface ForecastProps {
    days: number;
}

export const Forecast = ({ days }: ForecastProps) => {
    const { weather, loading, error } = useWeather('forecast', days);

    if (loading) {
        return (
            <View style={styles.center}>
                <Text>Loading forecast...</Text>
            </View>
        );
    }

    if (error || !weather?.forecast?.forecastday) {
        return (
            <View style={styles.center}>
                <Text>Failed to load forecast.</Text>
            </View>
        );
    }

    return (
        <View style={{ padding: 20 }}>
            <Text style={styles.title}>
                Forecast for {weather.location.name}, {weather.location.region}
            </Text>
            <FlatList
                data={weather.forecast.forecastday}
                keyExtractor={(item) => item.date}
                renderItem={({ item }) => (
                    <View style={styles.item}>
                        <Text>{item.date}</Text>
                        <Text>{item.day.condition.text}</Text>
                        <Text>
                            {item.day.maxtemp_f}°F | {item.day.mintemp_f}°F
                        </Text>
                        <Image
                            source={{ uri: `https:${item.day.condition.icon}` }}
                            style={styles.icon}
                        />
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    item: {
        marginBottom: 16,
    },
    icon: {
        width: 40,
        height: 40,
    },
});
