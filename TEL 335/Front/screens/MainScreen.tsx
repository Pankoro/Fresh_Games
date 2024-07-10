import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { API_BASE_URL } from '../config';

type MainScreenProps = {
  navigation: NavigationProp<any, any>;
};

const MainScreen: React.FC<MainScreenProps> = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Menú Principal</Text>
      <Button title="Ver Publicaciones" onPress={() => navigation.navigate('PostList')} />
      <Button title="Crear Publicación" onPress={() => navigation.navigate('CreatePost')} />
      <Button title="Ver Perfil" onPress={() => navigation.navigate('UserProfile')} />
      <Button title="Buscar" onPress={() => navigation.navigate('Search')} />
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

export default MainScreen;
