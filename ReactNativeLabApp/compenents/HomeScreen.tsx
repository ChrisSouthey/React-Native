import React, { useState } from 'react';
import {
    View,
    TextInput,
    FlatList,
    Image,
    TouchableOpacity,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { StackParamList } from '../App';
import Animated, { useAnimatedScrollHandler, useAnimatedStyle, useSharedValue } from 'react-native-reanimated';

type HomeScreenNavigationProp = StackNavigationProp<StackParamList, 'Home'>;

interface ImageData {
    id: number;
    url: string;
}

export const HomeScreen = () => {
    const navigation = useNavigation<HomeScreenNavigationProp>();
    const [images] = useState<ImageData[]>(
        Array.from({ length: 60 }, (_, i) => ({
            id: i + 1,
            url: `https://picsum.photos/id/${i + 1}/200`,
        }))
    );

    const ITEM_SIZE = 120;                

    const [searchTerm, setSearchTerm] = useState('');

    const filteredImages = images.filter((img) =>
        img.id.toString().includes(searchTerm)
    );

    const marginVertical = useSharedValue(2);

    const scrollHandler = useAnimatedScrollHandler({
        onScroll: (event) => {
            const newMargin = 2 + event.contentOffset.y / 30;
            if (newMargin < 2) {
                marginVertical.value = 2;
            } else if (newMargin > 20) {
                marginVertical.value = 20;
            } else {
                marginVertical.value = newMargin;
            }
        },
    });

    const animatedStyle = useAnimatedStyle(() => {

        const spinDeg = (marginVertical.value - 2) * 180;

        return {
            marginVertical: marginVertical.value,
            transform: [{ rotate: `${spinDeg}deg` }],
        };
    });

    const renderItem = ({ item }: { item: ImageData }) => (
        <TouchableOpacity
            onPress={() => navigation.navigate('Details', { url: item.url })}
        >
            <Animated.Image source={{ uri: item.url }} sharedTransitionTag={`tag-${item.url}`} style={[styles.imageThumbnail, animatedStyle]} />
        </TouchableOpacity>
    );

    return (
        <SafeAreaView style={styles.container}>
            <TextInput
                placeholder="Search..."
                style={styles.searchBar}
                value={searchTerm}
                onChangeText={setSearchTerm}
            />
            <Animated.FlatList
                onScroll={scrollHandler}
                data={filteredImages}
                renderItem={renderItem}
                keyExtractor={(item) => item.id.toString()}
                numColumns={3}
                contentContainerStyle={styles.grid}
            />
        </SafeAreaView>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 20,
        backgroundColor: '#eee',
    },
    searchBar: {
        height: 40,
        margin: 10,
        borderWidth: 1,
        borderRadius: 4,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
    },
    grid: {
        alignItems: 'center',
    },
    imageThumbnail: {
        width: 110,
        height: 110,
        margin: 5,
        backgroundColor: '#ccc',
    },
});
