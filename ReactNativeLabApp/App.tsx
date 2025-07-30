import React, { useState } from 'react';
import {
  View,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
  SafeAreaView,
} from 'react-native';

interface ImageData {
  id: number;
  url: string;
}

const App = () => {
  const [images] = useState<ImageData[]>(
    Array.from({ length: 60 }, (_, i) => ({
      id: i + 1,
      url: `https://picsum.photos/id/${i + 1}/200`,
    }))
  );

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredImages = images.filter((img) =>
    img.id.toString().includes(searchTerm)
  );

  const renderItem = ({ item }: { item: ImageData }) => (
    <TouchableOpacity onPress={() => setSelectedImage(item.url)}>
      <Image source={{ uri: item.url }} style={styles.imageThumbnail} />
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

      <FlatList
        data={filteredImages}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        numColumns={3}
        contentContainerStyle={styles.grid}
      />

      <Modal visible={!!selectedImage} transparent>
        <TouchableOpacity style={styles.fullScreenModal} onPress={() => setSelectedImage(null)}>
          {selectedImage && (
            <Image
              source={{ uri: selectedImage.replace('/200', '/500') }}
              style={styles.fullImage}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 20,
    backgroundColor: '#eee'
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
    backgroundColor: '#ccc'
  },
  fullScreenModal: {
    flex: 1,
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullImage: {
    width: '100%',
    height: '100%',
  },
});

export default App;
