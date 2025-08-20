import React from 'react';
import { View, Image, StyleSheet } from 'react-native';
import { StackScreenProps } from '@react-navigation/stack';
import { StackParamList } from '../App';

type Props = StackScreenProps<StackParamList, 'Modal'>;

export const PictureModal = ({ route }: Props) => {
    const { url } = route.params;

    return (
        <View style={styles.container}>
            <Image
                source={{ uri: url.replace('/200', '/500') }}
                style={styles.image}
                resizeMode="contain"
            />
        </View>
    );
};



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});
