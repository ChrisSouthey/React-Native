import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { CameraView, Camera } from "expo-camera";
import { useFocusEffect, useNavigation } from '@react-navigation/native';




export default function ScannerApp() {

    const [hasPermission, setHasPermission] = useState<boolean | null>(null);
    const [scanned, setScanned] = useState(false);
    const [showCamera, setShowCamera] = useState(true);
    const locked = useRef(false);
    const navigation = useNavigation<any>();


    useEffect(() => {
        const getCameraPermissions = async () => {
            const { status } = await Camera.requestCameraPermissionsAsync();
            setHasPermission(status === 'granted');
        };

        getCameraPermissions();
    }, []);

    useFocusEffect(
        useCallback(() => {
            locked.current = false;
            setScanned(false);
            setShowCamera(true);
            return () => { };
        }, [])
    );

    const handleBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
        if (type !== 'qr' || locked.current) return;
        locked.current = true;

        const match = data.match(/products\/(\d+)/i);
        const productId = match ? Number(match[1]) : NaN;

        if (!productId) {
            Alert.alert('Scanned QR URL', data, [
                { text: 'OK', onPress: () => { locked.current = false; setScanned(false); setShowCamera(true); } },
            ]);
            return;
        }

        setScanned(true);
        setShowCamera(false);
        navigation.navigate('ProductDetails', { productId });
    };


    if (hasPermission === null) {
        return <Text>Requesting camera permission...</Text>;
    }

    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }

    return (
        <View style={styles.container}>
            {showCamera ? (
                <CameraView
                    style={StyleSheet.absoluteFillObject}
                    onBarcodeScanned={scanned ? undefined : handleBarcodeScanned}
                    barcodeScannerSettings={{ barcodeTypes: ['qr'] }}
                />
            ) : (
                <Text style={{ textAlign: 'center', marginTop: 50 }}>
                    Camera Closed
                </Text>
            )}

            <View style={styles.controls}>
                {scanned && (
                    <Button title="Tap to Scan Again" onPress={() => setScanned(false)} />
                )}
                <Button
                    title={showCamera ? "Close Camera" : "Open Camera"}
                    onPress={() => setShowCamera(!showCamera)}
                />
            </View>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 30,
    },
    controls: {
        position: 'absolute',
        bottom: 30,
        alignSelf: 'center',
        gap: 10,
    },
});
