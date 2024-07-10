import React, { useState, useEffect } from 'react';
import {Alert, View, Text, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {NavigationProp, RouteProp} from '@react-navigation/native';
import { API_BASE_URL } from '../config';
import Constants from "expo-constants";
import axios from "axios";
import {StackNavigationProp} from "@react-navigation/stack";
import {RootStackParamList} from "../types";

type OtherUserProfileScreen = {
  route: RouteProp<{ params: { userId: string } }, 'params'>;
  navigation: StackNavigationProp<RootStackParamList>;
};

const OtherUserProfileScreen: React.FC<OtherUserProfileScreen> = ({ route,navigation }) => {
  const { userId } = route.params;
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        console.log(userId)
        const response = await axios.get(`${API_BASE_URL}/api/user/${userId}`)
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
      <Button title="Reportar" color={'red'} onPress={() => Alert.alert('REPORTE','¿Reporta usuario?',[
        {text:'Si'},{text:'No'}
      ])} />
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
    marginBottom: 8,
  },
});

export default OtherUserProfileScreen;
