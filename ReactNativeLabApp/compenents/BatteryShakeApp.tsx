import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Accelerometer } from 'expo-sensors'
import * as Battery from 'expo-battery'

export default function ShakeCharge() {
    const [level, setLevel] = useState(0)

    useEffect(() => {
        Battery.getBatteryLevelAsync().then(l => setLevel(l * 100))
        const sub = Accelerometer.addListener(d => {
            let total = Math.sqrt(d.x * d.x + d.y * d.y + d.z * d.z)
            if (total > 1.5) {
                setLevel(n => (n + 0.5 > 100 ? 100 : n + 0.5))
            }
        })
        Accelerometer.setUpdateInterval(120)
        return () => sub && sub.remove()
    }, [])

    let barColor = '#44ff44'
    if (level < 50) barColor = '#ffaa00'
    if (level < 20) barColor = '#ff4444'

    return (
        <View style={styles.box}>
            <Text style={styles.percent}>{Math.round(level)}%</Text>
            <View style={styles.outer}>
                <View style={[styles.inner, { width: (level * 2.8), backgroundColor: barColor }]} />
            </View>
            <Text style={styles.tip}>Shake to charge</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    box: { flex: 1, backgroundColor: 'black', justifyContent: 'center', alignItems: 'center' },
    percent: { fontSize: 40, color: 'white', marginBottom: 15 },
    outer: { width: 280, height: 25, backgroundColor: '#444', borderRadius: 10 },
    inner: { height: '100%', borderRadius: 10 },
    tip: { marginTop: 15, color: 'white', fontSize: 14 }
})
