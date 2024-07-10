import React, { useState } from 'react';
import {ScrollView,View, Text, TextInput, Button, StyleSheet,ToastAndroid } from 'react-native';
import CheckBox from "../components/Options";
import axios from 'axios';
import { NavigationProp } from '@react-navigation/native';
import { API_BASE_URL } from '../config';
import Constants from "expo-constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Options from "../components/Options";

type CreatePostScreenProps = {
  navigation: NavigationProp<any, any>; 
};

const CreatePostScreen: React.FC<CreatePostScreenProps> = ({ navigation }) => {
    const [name, setName] = useState('');
    const [owner, setOwner] = useState('');
    const [valoracion, setValoracion] = useState('');
    const [ventaOcambio, setVentaOcambio] = useState('');
    const [location, setLocation] = useState('');
    const [estado, setEstado] = useState('');
    const [info, setInfo] = useState('');
    const [foto, setFoto] = useState('');
    const [valor,setValor]=useState('')

    const [isVenta, setIsVenta] = useState(false);
    const [isCambio, setIsCambio] = useState(false);

    const showToastGood = () => {
        ToastAndroid.show('Publicación agregada', ToastAndroid.SHORT);
    };
    const showToastBad = () => {
        ToastAndroid.show('Error al agregar publicacion', ToastAndroid.SHORT);
    };
    const handleCreatePost = async () => {
        try {
            // Construir el objeto de datos de la publicación
            const newPost = {
                name,
                owner,
                ventaOcambio,
                valoracion,
                valor,
                location,
                estado,
                info,
                foto
            };

            // Enviar la solicitud POST al servidor
            const response = await axios.post(`${API_BASE_URL}/api/publicacion`, newPost);
            console.log('Respuesta del servidor:', response.data);

            // Limpiar el formulario después de crear la publicación
            clearForm();

            // Navegar de regreso a MainScreen después de crear la publicación
            navigation.navigate('Market');
            showToastGood()
        } catch (error) {
            showToastBad()
            console.error('Error al crear la publicación:', error);
        }
    };

    const clearForm = () => {
        setName('');
        setOwner('');
        setValoracion('');
        setVentaOcambio('');
        setValor('')
        setLocation('');
        setEstado('');
        setInfo('');
        setFoto('');
    };

    const getCurrentUser = async () => {
        try {
            const userData = await AsyncStorage.getItem('userData');
            if (userData) {
                const { name } = JSON.parse(userData);
                setOwner(name)
                return name;
            }
            return null;
        } catch (error) {
            console.error('Error al obtener datos del usuario:', error);
            return null;
        }
    };

    getCurrentUser();

    return (
        <ScrollView style={styles.container}>
            <Text style={styles.title}>Crear Nueva Publicación</Text>
            <TextInput
                style={styles.input}
                placeholder="Nombre del juego"
                value={name}
                onChangeText={setName}
            />
            <Text>
                Venta o cambio
            </Text>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>

                <CheckBox
                    onPress={() => {
                            setVentaOcambio('Venta')
                            if(isVenta) {
                                setIsVenta(false)
                            }
                            else{
                                setIsVenta(true)
                                setIsCambio(false)
                            }
                        }
                    }
                    title="Venta"
                    isChecked={isVenta}
                />
                <CheckBox
                    onPress={() => {
                            setVentaOcambio('Cambio')
                            if (isCambio){
                                setIsCambio(false)
                            }
                            else{
                                setIsCambio(true)
                                setIsVenta(false)
                                setValor('-')
                            }
                        }
                    }
                    title="Cambio"
                    isChecked={isCambio}
                />
            </View>
            <View style={{ display: isVenta ? 'flex': 'none' }}>
                <TextInput
                    style={styles.input}
                    placeholder="Valor"
                    value={valor}
                    onChangeText={setValor}
                />
            </View>
            <TextInput
                style={styles.input}
                placeholder="Ubicación"
                value={location}
                onChangeText={setLocation}
            />
            <TextInput
                style={styles.input}
                placeholder="Estado"
                value={estado}
                onChangeText={setEstado}
            />
            <TextInput
                style={styles.input}
                placeholder="Información"
                value={info}
                onChangeText={setInfo}
            />
            <TextInput
                style={styles.input}
                placeholder="URL de la Foto"
                value={foto}
                onChangeText={setFoto}
            />
            <Button title="Crear Publicación" onPress={() => {
                        handleCreatePost()

                    }}/>
        </ScrollView>
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
        marginBottom: 16,
    },
    input: {
        width: '100%',
        padding: 8,
        marginVertical: 8,
        borderWidth: 1,
        borderRadius: 4,
    },
    checkbox: {
        alignSelf: 'center',
    },
});

export default CreatePostScreen;
