import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationProp } from '@react-navigation/native';
import { API_BASE_URL } from '../config';
import Constants from "expo-constants";

type SearchScreenProps = {
  navigation: NavigationProp<any, any>;
};

type SearchResult = {
  key: string;
  name: string;
  dueñoDelJuego: string;
  valoracion: string;
  ventaOcambio: string;
  location: string;
  estado: string;
  info: string;
  foto: string;
};

const SearchScreen: React.FC<SearchScreenProps> = ({ navigation }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/api/publicaciones/search?q=${query}`);
      setResults(response.data);
    } catch (error) {
      console.error('Error al realizar la búsqueda:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Buscar Publicaciones</Text>
      <TextInput
        style={styles.input}
        placeholder="Buscar..."
        value={query}
        onChangeText={setQuery}
      />
      <Button title="Buscar" onPress={handleSearch} />
      <FlatList
        data={results}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigation.navigate('PostDetail', { postId: item.key })}>
            <View style={styles.result}>
              <Text style={styles.postTitle}>{item.name}</Text>
              <Text style={styles.postInfo}>{item.ventaOcambio}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
  result: {
    padding: 16,
    borderBottomWidth: 1,
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postInfo: {
    fontSize: 14,
  },
});

export default SearchScreen;
