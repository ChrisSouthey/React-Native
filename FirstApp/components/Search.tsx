import React from 'react';
import { View, Image, Text, TextInput, StyleSheet } from 'react-native';

type SearchProps = {
    value: string;
    onChangeText: (text: string) => void;
};

export const SearchBar: React.FC<SearchProps> = ({ value, onChangeText }) => {
    return (
        <View style={styles.searchContainer}>
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
                value={value}
                onChangeText={onChangeText}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    searchContainer: {
        flex: 1,
        marginTop: 30,
        backgroundColor: '#00000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchInput: {
        flex: 1,
        borderColor: '#000',
        borderWidth: 2,
        fontSize: 20,
        padding: 10,
        marginBottom: 40,
        marginTop: 5,
        backgroundColor: '#00000',
        alignItems: 'center',
        justifyContent: 'center',
    },

});
