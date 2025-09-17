import React, { memo } from 'react'
import { TouchableOpacity, Text, StyleSheet } from 'react-native'
import Animated from 'react-native-reanimated'
import { GearItem } from './types'

type Props = { item: GearItem; onPress: (item: GearItem) => void }

function makePress(onPress: (item: GearItem) => void, item: GearItem) {
    return () => onPress(item)
}

function GearCardBase({ item, onPress }: Props) {
    const press = makePress(onPress, item)
    return (
        <TouchableOpacity style={styles.card} activeOpacity={0.9} onPress={press}>
            <Animated.Image sharedTransitionTag={`gear-${item.id}`} source={{ uri: item.image }} style={styles.thumb} />
            <Text numberOfLines={1} style={styles.name}>{item.name}</Text>
            <Text style={styles.price}>${item.price}</Text>
        </TouchableOpacity>
    )
}

export const GearCard = memo(GearCardBase)

const styles = StyleSheet.create({
    card: { width: '31%', margin: '1%', alignItems: 'center' },
    thumb: { width: 110, height: 110, borderRadius: 10, backgroundColor: '#ccc' },
    name: { marginTop: 6, fontSize: 12, textAlign: 'center' },
    price: { fontSize: 12, color: '#555' }
})
