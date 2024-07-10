import React, { useState, useEffect } from 'react';
import { Alert, View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp, RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import axios from 'axios';
import { RootStackParamList } from '../types';
import { API_BASE_URL } from '../config';

type OtherUserProfileScreenProps = {
  route: RouteProp<RootStackParamList, 'OtherUser'>; // Asegúrate de que coincide con tu definición en RootStackParamList
  navigation: StackNavigationProp<RootStackParamList, 'OtherUser'>; // Asegúrate de que coincide con tu definición en RootStackParamList
};

const OtherUserProfileScreen: React.FC<OtherUserProfileScreenProps> = ({ route, navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const response = await axios.get(`${API_BASE_URL}/api/users/${userId}`);
        if (response.data) {
          setUser(response.data);
        } else {
          setUser(null);
        }
      } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
      }
    };

    loadUserData();
  }, [navigation]);

  const handleReportUser = async () => {
    try {
      const response = await axios.put(`${API_BASE_URL}/api/users/${userId}/increment-report`);
      if (response.status === 200) {
        alert('Usuario reportado');
      } else {
        alert('Error al reportar usuario');
      }
    } catch (error) {
      console.error('Error al reportar usuario:', error);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('userData');
      setUser(null);
      navigation.reset({
        index: 0,
        routes: [{ name: 'Auth' }],
      });
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (!user) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil de Usuario</Text>
      <Text>Nombre: {user.name}</Text>
      <Text>Email: {user.mail}</Text>
      <Text>Ubicación: {user.location}</Text>
      <Text>Nombre Real: {user.realName}</Text>
      <Text>Reportes: {user.reports}</Text>
      <Button title="Reportar" color={'red'} onPress={handleReportUser} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
});

export default OtherUserProfileScreen;
