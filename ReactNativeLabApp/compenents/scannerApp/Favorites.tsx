import React, { useCallback, useState } from 'react';
import { View, Text, FlatList, Image, Pressable } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFocusEffect, useNavigation } from '@react-navigation/native';

const STORAGE_KEY = 'favs';

export default function Favorites() {
    const [items, setItems] = useState<any[]>([]);
    const navigation = useNavigation<any>();

    const load = useCallback(async () => {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        setItems(raw ? JSON.parse(raw) : []);
    }, []);

    useFocusEffect(useCallback(() => { load(); }, [load]));

    return (
        <View style={{ flex: 1, padding: 12, marginTop: 70 }}>
            {items.length === 0 && <Text style={{marginTop: 100, marginLeft: 155}}>No favorites yet.</Text>}
            <FlatList
                data={items}
                keyExtractor={(i) => String(i.id)}
                renderItem={({ item }) => (
                    <Pressable
                        style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}
                        onPress={() =>
                            navigation.navigate('ScannerTab', {
                                screen: 'ProductDetails',
                                params: { productId: item.id },
                            })
                        }
                    >
                        {item.image ? (
                            <Image source={{ uri: item.image }} style={{ width: 64, height: 64, borderRadius: 8, marginRight: 12 }} />
                        ) : (
                            <View style={{ width: 64, height: 64, backgroundColor: '#e5e7eb', borderRadius: 8, marginRight: 12 }} />
                        )}
                        <View>
                            <Text style={{ fontSize: 16, fontWeight: '600' }}>{item.title}</Text>
                            <Text>${Number(item.price).toFixed(2)}</Text>
                        </View>
                    </Pressable>
                )}
            />
        </View>
    );
}
