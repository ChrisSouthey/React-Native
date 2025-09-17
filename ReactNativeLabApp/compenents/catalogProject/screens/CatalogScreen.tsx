import React, { useMemo, useState } from 'react'
import { TextInput, FlatList, ActivityIndicator, StyleSheet, SafeAreaView } from 'react-native'
import { StackScreenProps } from '@react-navigation/stack'
import { GearItem } from '../types'
import { useGear } from '../useGear'
import { GearCard } from '../GearCard'

export type BrowseStackParamList = { Browse: undefined; ItemModal: { item: GearItem } }
type Props = StackScreenProps<BrowseStackParamList, 'Browse'>

function key(item: GearItem) { return String(item.id) }
function renderFactory(go: (item: GearItem) => void) { return ({ item }: { item: GearItem }) => <GearCard item={item} onPress={go} /> }

export default function CatalogScreen({ navigation }: Props) {
    const [q, setQ] = useState('')
    const { items, loading, error } = useGear('https://raw.githubusercontent.com/ChrisSouthey/React-Native/refs/heads/chris/ReactNativeLabApp/compenents/catalogProject/data/gear.json')
    const go = (item: GearItem) => navigation.navigate('ItemModal', { item })
    const renderItem = renderFactory(go)
    const data = useMemo(() => {
        const s = q.trim().toLowerCase()
        return s ? items.filter(x => x.name.toLowerCase().includes(s)) : items
    }, [items, q])

    if (loading) return <SafeAreaView style={styles.center}><ActivityIndicator /></SafeAreaView>
    if (error) return <SafeAreaView style={styles.center} />

    return (
        <SafeAreaView style={styles.container}>
            <TextInput placeholder="Search" value={q} onChangeText={setQ} style={styles.input} />
            <FlatList data={data} renderItem={renderItem} keyExtractor={key} numColumns={3} contentContainerStyle={styles.grid} />
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: '#eee' },
    input: { height: 40, margin: 10, borderWidth: 1, borderRadius: 6, paddingHorizontal: 10, backgroundColor: '#fff' },
    grid: { paddingBottom: 20 },
    center: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#eee' }
})
