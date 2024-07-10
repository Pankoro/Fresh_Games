import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, ToastAndroid } from 'react-native';
import axios from 'axios';
import { NavigationProp } from '@react-navigation/native';
import { API_BASE_URL } from '../config';

type RegisterScreenProps = {
  navigation: NavigationProp<any, any>;
};

const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [realName, setRealName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [country, setCountry] = useState('');
  const [nameExist, setNameExist] = useState(false);

  const showToastBad = () => {
    ToastAndroid.show('Nombre de usuario ya existente', ToastAndroid.SHORT);
  };

  const handleVerifyUserName = async () => {
    try {
      setNameExist(false);
      const response = await axios.get(`${API_BASE_URL}/api/users/check-duplicate/${name}`);
      setNameExist(response.data.isNameTaken);
    } catch (error) {
      alert('Error al verificar el nombre de usuario');
      console.error(error);
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/api/users`, {
        name,
        realName,
        mail: email,
        password,
        location: country,
      });

      if (response.status === 200) {
        alert('Usuario registrado exitosamente');
        navigation.navigate('Login');
      } else {
        alert('Error al registrar usuario');
      }
    } catch (error) {
      alert('Error al registrar usuario');
      console.error(error);
    }
  };

  return (
    <View style={styles.container}>
      <Text>Registrarse</Text>
      <TextInput
        style={styles.input}
        placeholder="Usuario"
        value={name}
        onChangeText={setName}
        onBlur={handleVerifyUserName}
      />
      {nameExist && <Text style={{ color: 'red' }}>Nombre de usuario ya existe</Text>}
      <TextInput
        style={styles.input}
        placeholder="Nombre Real"
        value={realName}
        onChangeText={setRealName}
      />
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        style={styles.input}
        placeholder="Contraseña"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirmar Contraseña"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Ciudad, Región"
        value={country}
        onChangeText={setCountry}
      />
      <Button title="Registrar" onPress={handleRegister} disabled={nameExist} />
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

export default RegisterScreen;
