
import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const ContactCard = ({ name, image }) => {
    return (
        <View style={styles.container}>
            <Image source={{ uri: image }} style={styles.image} />
            <Text style={styles.name}>{name}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    name: {
        flex: 1,
        fontSize: 20,
        padding: 5,
        backgroundColor: '#fff',
    },
    image: {
        flex: 1,
    },
});


export default ContactCard;