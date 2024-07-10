import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { NavigationProp } from '@react-navigation/native';
import { API_BASE_URL } from '../config';

type LoginScreenProps = {
  navigation: NavigationProp<any, any>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const authResponse = await axios.post(`${API_BASE_URL}/api/users/authenticate`, {
        username: username,
        password: password,
      });

      if (authResponse.status === 200) {
        const userResponse = await axios.get(`${API_BASE_URL}/api/users/${username}`);

        if (userResponse.status === 200) {
          const { name, mail, location, realName, reports } = userResponse.data;
          const userData = { name, mail, location, realName, reports };

          console.log(userData);  // Añade esta línea para verificar los datos

          await AsyncStorage.setItem('userData', JSON.stringify(userData));

          navigation.reset({
            index: 0,
            routes: [{ name: 'MainApp' }],
          });
        } else {
          alert('Error al obtener los datos del usuario');
        }
      } else {
        alert('Credenciales incorrectas');
      }
    } catch (error) {
      alert('Error al intentar iniciar sesión');
      console.error(error);
    }
  };

  const handleRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={styles.container}>
      <Text>Iniciar Sesión</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title="Iniciar Sesión" onPress={handleLogin} />
      <Button title="Registrarse" onPress={handleRegister} />
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

export default LoginScreen;
