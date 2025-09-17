import React from 'react'
import { View, Text, Pressable, StyleSheet, SafeAreaView, Platform, Vibration } from 'react-native'
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native'
import Animated from 'react-native-reanimated'
import * as Haptics from 'expo-haptics'
import { GearItem } from '../types'
import { useCollection } from '../CollectionContext'

type ParamList = { ItemModal: { item: GearItem } }

async function buzz() {
    try {
        await Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success)
    } catch {
        Vibration.vibrate(40)
    }
}

export default function ItemModal() {
    const route = useRoute<RouteProp<ParamList, 'ItemModal'>>()
    const nav = useNavigation()
    const { item } = route.params
    const { has, toggle } = useCollection()
    const active = has(item.id)

    function close() { nav.goBack() }
    async function change() {
        toggle(item)
        await buzz()
    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.Image sharedTransitionTag={`gear-${item.id}`} source={{ uri: item.image }} style={styles.hero} />
            <Text style={styles.title}>{item.name}</Text>
            <Text style={styles.meta}>{item.type} • ${item.price}</Text>
            <View style={styles.row}>
                <Pressable style={styles.btn} onPress={close}><Text style={styles.btnText}>Close</Text></Pressable>
                <Pressable style={styles.btn} onPress={change}><Text style={styles.btnText}>{active ? 'Remove' : 'Add to Collection'}</Text></Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#000', alignItems: 'center', justifyContent: 'center', padding: 16 },
    hero: { width: 280, height: 280, borderRadius: 16, backgroundColor: '#333' },
    title: { marginTop: 16, fontSize: 20, color: '#fff' },
    meta: { marginTop: 6, fontSize: 14, color: '#aaa' },
    row: { flexDirection: 'row', marginTop: 20, gap: 12 },
    btn: { backgroundColor: '#222', paddingHorizontal: 16, paddingVertical: 10, borderRadius: 10 },
    btnText: { color: '#fff', fontSize: 14 }
})
