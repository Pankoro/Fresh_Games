import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NavigationProp } from '@react-navigation/native';
import { API_BASE_URL } from '../config';

type EditProfileScreenProps = {
  navigation: NavigationProp<any, any>;
};

const EditProfileScreen: React.FC<EditProfileScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('');
  const [oldPassword, setOldPassword] = useState('');

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('userData');
        if (userData) {
          const user = JSON.parse(userData);
          setName(user.name);
          setEmail(user.email);
          setLocation(user.location);
        }
      } catch (error) {
        console.error('Error al cargar datos de usuario:', error);
      }
    };

    loadUserData();
  }, []);

  const handleSaveChanges = async () => {
    try {
      const userData = await AsyncStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        const updateData = {
          newName: name,
          newMail: email,
          newPassword: password || undefined,
          newLocation: location,
          oldPassword,
        };

        const response = await axios.put(`${API_BASE_URL}/api/userupdate/${user.name}`, updateData);

        if (response.status === 200) {
          // Eliminar datos del usuario de AsyncStorage y redirigir a la pantalla de autenticación
          await AsyncStorage.removeItem('userData');
          navigation.reset({
            index: 0,
            routes: [{ name: 'Auth' }],
          });
        } else {
          alert(response.data.message || 'Error al actualizar el perfil');
        }
      }
    } catch (error) {
      alert('Error al guardar los cambios');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Editar Perfil</Text>
      <TextInput
        style={styles.input}
        placeholder="Nombre"
        value={name}
        onChangeText={setName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña Nueva (opcional)"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Ubicación"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña Actual"
        value={oldPassword}
        onChangeText={setOldPassword}
        secureTextEntry
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

export default EditProfileScreen;
