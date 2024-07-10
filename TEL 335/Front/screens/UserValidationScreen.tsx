import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { API_BASE_URL } from '../config';

type UserValidationScreenProps = {
  navigation: NavigationProp<any, any>;
};

const UserValidationScreen: React.FC<UserValidationScreenProps> = ({ navigation }) => {
  const handleValidateUser = () => {
    // Lógica para validar al usuario
    alert('Usuario validado');
  };

  return (
    <View style={styles.container}>
      <Text>Validar Usuario</Text>
      <Text>Nombre: Nombre de Usuario</Text>
      <Text>Email: email@ejemplo.com</Text>
      <Button title="Validar Usuario" onPress={handleValidateUser} />
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
});

export default UserValidationScreen;
