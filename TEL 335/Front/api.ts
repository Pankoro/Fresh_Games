import axios from 'axios';

const API_URL = 'http://localhost:3000/api'; // Cambia esto a tu URL de la API


export const registerUser = async (userData: { name: string; mail: string; password: string; location: string }) => {
    try {
      const response = await axios.post(`${API_URL}/user`, userData);
      return response.data;
    } catch (error) {
      console.error('Error registrando usuario', error);
      throw error;
    }
  };

export const loginUser = async (nameUser: string, password: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${nameUser}`);
    const user = response.data;

    if (user.password === password) {
      return user;
    } else {
      throw new Error('Contraseña incorrecta');
    }
  } catch (error) {
    console.error('Error iniciando sesión', error);
    throw error;
  }
};

export const getUserProfile = async (nameUser: string) => {
  try {
    const response = await axios.get(`${API_URL}/user/${nameUser}`);
    return response.data;
  } catch (error) {
    console.error('Error obteniendo perfil de usuario', error);
    throw error;
  }
};

export const updateUserProfile = async (nameUser: string, userData: { newName?: string; newPassword?: string; newMail?: string; newLocation?: string }) => {
  try {
    const response = await axios.put(`${API_URL}/user/${nameUser}`, userData);
    return response.data;
  } catch (error) {
    console.error('Error actualizando perfil de usuario', error);
    throw error;
  }
};
