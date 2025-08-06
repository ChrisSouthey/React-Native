import React from 'react';
import { View, Image, Button, StyleSheet, TouchableOpacity } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../App';

type Props = StackScreenProps<StackParamList, 'Details'>;

export const Details = ({ route, navigation }: Props) => {
    const { url } = route.params;

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => navigation.navigate('Modal', { url })} style={styles.imageWrapper}>
                <Image
                    source={{ uri: url.replace('/200', '/500') }}
                    style={styles.image}
                    resizeMode="contain"
                />
            </TouchableOpacity>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#808080',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '70%',
        height: '80%',
    },
    imageWrapper: {
        marginLeft: 110,
        width: '80%',
        height: '80%',
    },
});
