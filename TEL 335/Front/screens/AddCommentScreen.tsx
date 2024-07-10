import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import axios from 'axios';
import { API_BASE_URL } from '../config';
import Constants from "expo-constants";

type AddCommentScreenProps = {
  route: RouteProp<RootStackParamList, 'AddComment'>;
  navigation: StackNavigationProp<RootStackParamList>;
};

const AddCommentScreen: React.FC<AddCommentScreenProps> = ({ route, navigation }) => {
  const { postId } = route.params;
  const [commentText, setCommentText] = useState('');
  const [userName, setUserName] = useState('');

  useEffect(() => {
    // Obtener datos de usuario desde AsyncStorage al cargar la pantalla
    const getUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData !== null) {
          const { name } = JSON.parse(userData);
          setUserName(name);
        }
      } catch (error) {
        console.error('Error al obtener datos de usuario desde AsyncStorage:', error);
      }
    };

    getUserData();
  }, []);

  const handleAddComment = async () => {
    try {
      // Validar que el comentario no esté vacío
      if (!commentText.trim()) {
        Alert.alert('Error', 'El comentario no puede estar vacío');
        return;
      }

      const response = await axios.post(`${API_BASE_URL}/api/comments`, {
        postId,
        user: userName,
        text: commentText,
      });
      console.log('Comentario añadido:', response.data);
      navigation.goBack();
    } catch (error) {
      console.error('Error al agregar comentario:', error);
      Alert.alert('Error', 'No se pudo agregar el comentario. Inténtelo de nuevo más tarde.');
    }
  };

  return (
    <View style={styles.container}>
      <Text>Agregar Comentario</Text>
      <TextInput
        style={styles.input}
        placeholder="Comentario"
        value={commentText}
        onChangeText={setCommentText}
        multiline={true}
        numberOfLines={4} // Permite múltiples líneas para el comentario
      />
      <Button title="Enviar" onPress={handleAddComment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    marginTop: Constants.statusBarHeight
  },
  input: {
    width: '100%',
    height: 100, // Altura suficiente para varias líneas
    padding: 8,
    marginVertical: 8,
    borderWidth: 1,
    borderRadius: 4,
  },
});

export default AddCommentScreen;
