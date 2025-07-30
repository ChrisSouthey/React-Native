import React, { useState } from 'react';
import { View, TextInput, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import ContactCard from './ContactCard';
import { SearchBar } from './Search';

const ContactList = ({ contacts }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <View style={styles.container}>
      <SearchBar value={searchQuery} onChangeText={setSearchQuery}/>
      <FlatList
        data={filteredContacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <ContactCard name={item.name} image={item.image} />
        )}
      />
    </View>
  );
};

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
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
        fontSize:20,
        padding:10,
        marginBottom: 40,
        marginTop:5,
        backgroundColor: '#00000',
        alignItems: 'center',
        justifyContent: 'center',
    },
    searchIcon: {
        flex: 1,
        width:20,
        height:20,
        backgroundColor: '#00000',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ContactList;