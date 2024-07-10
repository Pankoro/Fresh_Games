import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { NavigationProp } from '@react-navigation/native';
import { API_BASE_URL } from '../config';
import Constants from 'expo-constants';
import { StatusBar } from 'expo-status-bar';

type PostListScreenProps = {
  navigation: NavigationProp<any, any>;
};

type Post = {
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

const PostListScreen: React.FC<PostListScreenProps> = ({ navigation }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/publicaciones`);
        setPosts(response.data);
      } catch (error) {
        console.error('Error al cargar las publicaciones:', error);
      }
    };

    fetchPosts();
  }, []);

  const navigateToPostDetail = (postId: string) => {
    navigation.navigate('PostDetail', { postId });
  };

  return (
    <View style={styles.container}>
      <StatusBar
          style="light"
          backgroundColor='#191970'
      />
      <Text style={styles.title}>Lista de Publicaciones</Text>
      <FlatList
        data={posts}
        keyExtractor={(item) => item.key}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => navigateToPostDetail(item.key)}>
            <View style={styles.post}>
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
    padding: 16,
    marginTop: Constants.statusBarHeight
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  post: {
    padding: 16,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  postTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  postInfo: {
    fontSize: 14,
  },
});

export default PostListScreen;
