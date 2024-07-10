import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, FlatList, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { RouteProp, useFocusEffect, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types';
import { API_BASE_URL } from '../config';
import Constants from "expo-constants";

type PostDetailScreenProps = {
  route: RouteProp<{ params: { postId: string } }, 'params'>;
  navigation: StackNavigationProp<RootStackParamList>;
};

type Comment = {
  _id: string; // Cambiado a string para coincidir con el backend
  postId: string;
  user: string;
  text: string;
  timestamp: string;
};

type Post = {
  key: string;
  name: string;
  DueñoDelJuego: string;
  valoracion: string;
  ventaOcambio: string;
  valor: string;
  location: string;
  estado: string;
  info: string;
  foto: string;
};

const PostDetailScreen: React.FC<PostDetailScreenProps> = ({ route, navigation }) => {
  const { postId } = route.params;
  const [post, setPost] = useState<Post | null>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState<string | null>(null);

  const navigation2 = useNavigation();

  const getCurrentUser = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const { name } = JSON.parse(userData);
        return name;
      }
      return null;
    } catch (error) {
      console.error('Error al obtener datos del usuario:', error);
      return null;
    }
  };

  const fetchPostAndComments = async () => {
    try {
      setLoading(true);
      const postResponse = await axios.get(`${API_BASE_URL}/api/publicaciones/${postId}`);
      if (postResponse.data) {
        setPost(postResponse.data);
      } else {
        setPost(null);
      }

      const commentsResponse = await axios.get(`${API_BASE_URL}/api/comments/${postId}`);
      if (commentsResponse.data) {
        setComments(commentsResponse.data);
      } else {
        setComments([]);
      }
    } catch (error) {
      console.error('Error al cargar la publicación y/o comentarios:', error);
      Alert.alert('Error', 'No se pudo cargar la publicación y/o comentarios.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCurrentUser().then((user) => {
      setCurrentUser(user);
    });
    fetchPostAndComments();
  }, [postId]);

  useFocusEffect(
    React.useCallback(() => {
      fetchPostAndComments();
    }, [postId])
  );

  const renderComment = ({ item }: { item: Comment }) => (
    <View style={styles.commentContainer}>
      <Text style={styles.commentUser}>{item.user}</Text>
      <Text style={styles.commentText}>{item.text}</Text>
      <Text style={styles.commentTimestamp}>{item.timestamp}</Text>
      {currentUser === item.user && (
        <View style={styles.buttonContainer}>
          <TouchableOpacity onPress={() => handleEditComment(item)} style={styles.editButton}>
            <Text style={styles.editButtonText}>Editar</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => handleDeleteComment(item._id)} style={styles.deleteButton}>
            <Text style={styles.deleteButtonText}>Eliminar</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );

  const handleEditComment = (comment: Comment) => {
    navigation.navigate('EditComment', { postId, commentId: comment._id, commentText: comment.text });
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/api/comments/${postId}/${commentId}`);
      const updatedComments = comments.filter(c => c._id !== commentId);
      setComments(updatedComments);
    } catch (error) {
      console.error('Error al eliminar el comentario:', error);
      Alert.alert('Error', 'No se pudo eliminar el comentario.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Cargando...</Text>
      </View>
    );
  }

  if (!post) {
    return (
      <View style={styles.loadingContainer}>
        <Text>No hay detalles de publicación para mostrar.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{post.name}</Text>
      {post.foto ? (
        <Image source={{ uri: post.foto }} style={styles.image} />
      ) : (
        <Text>No hay imagen disponible</Text>
      )}
      <TouchableOpacity onPress={() => navigation2.navigate('OtherUser', { userId: post.DueñoDelJuego })}>
        <Text style={styles.info}>
          Dueño del Juego:{' '}
          <Text style={{ color: 'red' }}>{post.DueñoDelJuego} <Text style={{ fontSize: 10, color:'black' }}>Ver perfil dueño</Text></Text>
        </Text>
      </TouchableOpacity>
      <Text style={styles.info}>Venta o Cambio: {post.ventaOcambio}</Text>
      <Text style={styles.info}>Valor: {post.valor}</Text>
      <Text style={styles.info}>Ubicación: {post.location}</Text>
      <Text style={styles.info}>Estado: {post.estado}</Text>
      <Text style={styles.info}>Informacion adicional:</Text>
      <Text style={styles.description}>{post.info}</Text>

      <FlatList
        data={comments}
        renderItem={renderComment}
        keyExtractor={(item) => item._id}
        ListEmptyComponent={<Text>No hay comentarios</Text>}
      />

      <TouchableOpacity
        style={styles.addButton}
        onPress={() => navigation.navigate('AddComment', { postId })}
      >
        <Text style={styles.addButtonText}>Agregar Comentario</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    marginBottom: 16,
    borderRadius: 8,
  },
  info: {
    fontSize: 16,
    marginBottom: 4,
  },
  description: {
    fontSize: 14,
    marginBottom: 16,
  },
  commentContainer: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 12,
  },
  commentUser: {
    fontWeight: 'bold',
    marginBottom: 4,
  },
  commentText: {
    marginBottom: 4,
  },
  commentTimestamp: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 8,
  },
  editButton: {
    backgroundColor: '#007BFF',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  editButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  deleteButton: {
    backgroundColor: '#DC3545',
    padding: 8,
    borderRadius: 4,
    marginLeft: 8,
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  addButton: {
    backgroundColor: '#28A745',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 16,
  },
  addButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default PostDetailScreen;
