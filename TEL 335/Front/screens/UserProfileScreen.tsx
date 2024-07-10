import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationProp } from '@react-navigation/native';
import { API_BASE_URL } from '../config';

type UserProfileScreenProps = {
  navigation: NavigationProp<any, any>;
};

const UserProfileScreen: React.FC<UserProfileScreenProps> = ({ navigation }) => {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          console.log(parsedUserData); // Añade esta línea para verificar los datos recuperados
          setUser(parsedUserData);
        } else {
          navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
        }
      } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
      }
    };

    loadUserData();
  }, [navigation]);

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
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
        <Button title="Editar Perfil" onPress={() => navigation.navigate('EditProfile')} />
        <Button title="Cerrar Sesión" onPress={handleLogout} />
      </View>
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

export default UserProfileScreen;
