import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, Text, Image, Pressable, ActivityIndicator, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRoute, useNavigation } from '@react-navigation/native';

const STORAGE_KEY = 'favs';

export default function ProductDetails() {
    const navigation = useNavigation<any>();
    const route = useRoute<any>();
    const productId = route.params?.productId;

    const [product, setProduct] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [favorite, setFavorite] = useState(false);

    useEffect(() => {
        fetch(`https://dummyjson.com/products/${productId}`)
            .then(res => res.json())
            .then(data => {
                setProduct(data);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, [productId]);

    useEffect(() => {
        AsyncStorage.getItem(STORAGE_KEY).then(raw => {
            const list = raw ? JSON.parse(raw) : [];
            const found = list.find((x: any) => x.id === productId);
            setFavorite(!!found);
        });
    }, [productId]);

    const addFavorite = async () => {
        const raw = await AsyncStorage.getItem(STORAGE_KEY);
        let list = raw ? JSON.parse(raw) : [];
        if (favorite) {
            list = list.filter((x: any) => x.id !== productId);
            setFavorite(false);
        } else {
            const item = {
                id: product.id,
                title: product.title,
                price: product.price,
                image: product.images?.[0] ?? product.thumbnail,
            };
            list = [item, ...list];
            setFavorite(true);
        }
        await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(list));
    };

    useLayoutEffect(() => {
        navigation.setOptions({
            title: product ? product.title : 'Product',
            headerBackTitleVisible: false,
            headerRight: () => (
                <Pressable onPress={addFavorite} hitSlop={10} disabled={!product}>
                    <Text style={{ fontSize: 18, marginRight: 20 }}>{favorite ? '♥' : '♡'}</Text>
                </Pressable>
            ),
        });
    }, [navigation, favorite, product]);

    if (loading) return <ActivityIndicator />;
    if (!product) return <View style={{ padding: 20 }}><Text>Not found</Text></View>;

    const image = product.images?.[0] ?? product.thumbnail;

    return (
        <View style={{ flex: 1, padding: 20, backgroundColor: '#fff' }}>
            {image ? <Image source={{ uri: image }} style={{ width: '100%', height: 220, borderRadius: 12, marginBottom: 12 }} /> : null}
            <Text style={{ fontSize: 20, fontWeight: '700', marginBottom: 6 }}>{product.title}</Text>
            <Text style={{ fontSize: 16 }}>${Number(product.price).toFixed(2)}</Text>
        </View>
    );
}
