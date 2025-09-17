import React from 'react'
import { FlatList, SafeAreaView, StyleSheet } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { GearItem } from '../types'
import { useCollection } from '../CollectionContext'
import { GearCard } from '../GearCard'

export type CollectionStackParamList = { Collection: undefined; ItemModal: { item: GearItem } }
type Props = StackScreenProps<CollectionStackParamList, 'Collection'>

function key(item: GearItem) { return String(item.id) }
function renderFactory(go: (item: GearItem) => void) { return ({ item }: { item: GearItem }) => <GearCard item={item} onPress={go} /> }

export default function CollectionScreen({ navigation }: Props) {
    const { list } = useCollection()
    const go = (item: GearItem) => navigation.navigate('ItemModal', { item })
    const renderItem = renderFactory(go)
    return (
        <SafeAreaView style={styles.container}>
            <FlatList data={list} renderItem={renderItem} keyExtractor={key} numColumns={3} contentContainerStyle={styles.grid} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#eee' },
    grid: { paddingBottom: 20 }
})
