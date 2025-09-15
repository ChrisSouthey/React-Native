import React, { useState, useEffect, useCallback } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Battery from 'expo-battery';

export default function AccelApp() {
    const [{ x, y, z }, setAccelerometerData] = useState({
        x: 0,
        y: 0,
        z: 0,
    });
    const [accelerometerSubscription, setAccelerometerSubscription] = useState<Accelerometer.Subscription | null>(null);

    const [batteryLevel, setBatteryLevel] = useState<number | null>(null);
    const [batterySubscription, setBatterySubscription] = useState<Battery.EventSubscription | null>(null);

    const _slow = () => Accelerometer.setUpdateInterval(1000);
    const _fast = () => Accelerometer.setUpdateInterval(16);

    const _subscribeAccelerometer = () => {
        setAccelerometerSubscription(Accelerometer.addListener(setAccelerometerData));
    };

    const _unsubscribeAccelerometer = () => {
        accelerometerSubscription && accelerometerSubscription.remove();
        setAccelerometerSubscription(null);
    };

    const _subscribeBattery = async () => {
        const batteryLevel = await Battery.getBatteryLevelAsync();
        setBatteryLevel(batteryLevel);

        setBatterySubscription(
            Battery.addBatteryLevelListener(({ batteryLevel }) => {
                setBatteryLevel(batteryLevel);
                console.log('batteryLevel changed!', batteryLevel);
            })
        );
    };

    const _unsubscribeBattery = useCallback(() => {
        batterySubscription && batterySubscription.remove();
        setBatterySubscription(null);
    }, [batterySubscription]);

    useEffect(() => {
        _subscribeAccelerometer();
        _subscribeBattery();

        return () => {
            _unsubscribeAccelerometer();
            _unsubscribeBattery();
        };
    }, []);

    return (
        <View style={styles.container}>

            <View style={styles.accel}>
                <Text style={styles.sectionTitle}>Accelerometer</Text>
                <Text style={styles.text}>
                    (in gs where 1g = 9.81 m/sÂ²)
                </Text>
                <Text style={styles.text}>x: {x.toFixed(2)}</Text>
                <Text style={styles.text}>y: {y.toFixed(2)}</Text>
                <Text style={styles.text}>z: {z.toFixed(2)}</Text>

                <View style={styles.buttonContainer}>
                    <TouchableOpacity
                        onPress={accelerometerSubscription ? _unsubscribeAccelerometer : _subscribeAccelerometer}
                        style={styles.button}
                    >
                        <Text>{accelerometerSubscription ? 'On' : 'Off'}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={_slow}
                        style={[styles.button, styles.middleButton]}
                    >
                        <Text>Slow</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={_fast} style={styles.button}>
                        <Text>Fast</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View>
                <Text style={styles.sectionTitle}>Battery Level</Text>
                <Text style={styles.text}>
                    Current Battery Level: {batteryLevel ? `${Math.round(batteryLevel * 100)}%` : 'Loading...'}
                </Text>
            </View>



        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        paddingHorizontal: 20,
    },
    accel: {
        marginBottom: 50,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 10,
        color: '#333',
    },
    text: {
        textAlign: 'center',
        fontSize: 16,
        marginVertical: 2,
        color: '#000',
    },
    buttonContainer: {
        flexDirection: 'row',
        alignItems: 'stretch',
        marginTop: 15,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#eee',
        padding: 10,
        borderRadius: 5,
    },
    middleButton: {
        borderLeftWidth: 1,
        borderRightWidth: 1,
        borderColor: '#ccc',
        marginHorizontal: 5,
    },
});
