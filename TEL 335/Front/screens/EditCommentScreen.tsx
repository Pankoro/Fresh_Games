import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { API_BASE_URL } from '../config';
import axios from 'axios';

type EditCommentScreenProps = {
  route: RouteProp<RootStackParamList, 'EditComment'>;
  navigation: StackNavigationProp<RootStackParamList, 'EditComment'>;
};

const EditCommentScreen: React.FC<EditCommentScreenProps> = ({ route, navigation }) => {
  const { postId, commentId, commentText } = route.params;

  console.log('EditCommentScreen params:', { postId, commentId, commentText });

  const [comment, setComment] = useState(commentText);
  const [loading, setLoading] = useState(false);

  const handleSaveChanges = async () => {
    if (!commentId) {
      Alert.alert('Error', 'El ID del comentario es indefinido.');
      return;
    }

    try {
      setLoading(true);
      await axios.put(`${API_BASE_URL}/api/comments/${postId}/${commentId}`, { text: comment });
      Alert.alert('Éxito', 'El comentario se ha actualizado correctamente.');
      navigation.goBack();
    } catch (error) {
      console.error('Error updating comment:', error);
      Alert.alert('Error', 'No se pudo actualizar el comentario.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Editar Comentario</Text>
      <TextInput
        style={styles.input}
        placeholder="Escribe tu comentario aquí"
        value={comment}
        onChangeText={setComment}
        multiline
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  input: {
    width: '100%',
    height: 200,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 8,
    marginBottom: 16,
    textAlignVertical: 'top',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default EditCommentScreen;
