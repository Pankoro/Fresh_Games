import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';
import { RouteProp } from '@react-navigation/native';
import { NavigationProp } from '@react-navigation/native';
import { API_BASE_URL } from '../config';

type RootStackParamList = {
  EditPost: { postId: string };
};

export type EditPostScreenProps = {
  route: RouteProp<RootStackParamList, 'EditPost'>;
  navigation: NavigationProp<RootStackParamList>;
};

const EditPostScreen: React.FC<EditPostScreenProps> = ({ route, navigation }) => {
  const { postId } = route.params;
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [price, setPrice] = useState('');
  const [image, setImage] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/publicacion/${postId}`);
        const post = response.data;
        setTitle(post.name);
        setDescription(post.info);
        setCategory(post.category); // Ajusta esto según sea necesario
        setPrice(post.price); // Ajusta esto según sea necesario
        setImage(post.foto);
      } catch (error) {
        console.error('Error al cargar la publicación:', error);
      }
    };

    fetchPost();
  }, [postId]);

  const handleSaveChanges = async () => {
    try {
      const updatedPost = {
        name: title,
        info: description,
        category, // Ajusta esto según sea necesario
        price, // Ajusta esto según sea necesario
        foto: image,
      };

      await axios.put(`${API_BASE_URL}/api/publicacion/${postId}`, updatedPost);
      navigation.goBack();
    } catch (error) {
      console.error('Error al actualizar la publicación:', error);
      alert('Error al actualizar la publicación');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Editar Publicación</Text>
      <TextInput
        style={styles.input}
        placeholder="Título"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Descripción"
        value={description}
        onChangeText={setDescription}
      />
      <TextInput
        style={styles.input}
        placeholder="Categoría"
        value={category}
        onChangeText={setCategory}
      />
      <TextInput
        style={styles.input}
        placeholder="Precio"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={styles.input}
        placeholder="URL de Imagen"
        value={image}
        onChangeText={setImage}
      />
      <Button title="Guardar Cambios" onPress={handleSaveChanges} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  input: {
    width: '100%',
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default EditPostScreen;
