import {View, Text, Image} from "react-native";
import React from "react";
import {createStackNavigator} from "@react-navigation/stack";
import {createBottomTabNavigator} from "@react-navigation/bottom-tabs";
import PostListScreen from '../screens/PostListScreen';
import CreatePostScreen from '../screens/CreatePostScreen';
import UserProfileScreen from '../screens/UserProfileScreen';
import SearchScreen from '../screens/SearchScreen';
import OtherUserProfileScreen from '../screens/OtherUserProfileScreen';

//const Tab = createStackNavigator()
const Tab=createBottomTabNavigator()
function NatigationTab(){
    return(
        <Tab.Navigator

            screenOptions={{
                tabBarHideOnKeyboard: true,
                tabBarActiveTintColor: 'red',
                tabBarInactiveTintColor:'black',
                tabBarStyle: { height: 60 },
                headerShown: false,
                unmountOnBlur: true
            }}

        >
            <Tab.Screen name="Market" component={PostListScreen}
                        options={{
                            tabBarIcon: ({focused}) => (
                                <Image source={require('../assets/home2.png')}
                                       style={{width:40, height:40}}
                                />
                            )
                        }}
            />
            <Tab.Screen name="Buscador" component={SearchScreen}
                        options={{
                            tabBarIcon: ({focused}) => (
                                <Image source={require('../assets/lupa.png')}
                                       style={{width:40, height:40}}
                                />
                            )
                        }}
            />
            <Tab.Screen name="Perfil" component={UserProfileScreen}
                        options={{
                            tabBarIcon: ({focused}) => (
                                <Image source={require('../assets/user2.png')}
                                       style={{width:40, height:40}}
                                />
                            )
                        }}
            />
            <Tab.Screen name="Agregar Publicación"
                        component={CreatePostScreen}
                        options={{
                            tabBarLabel: 'Agregar',
                            tabBarIcon: ({focused}) => (
                                <Image source={require('../assets/add.png')}
                                       style={{width:40, height:40}}
                                />
                            )
                        }}
            />
        </Tab.Navigator>
    )
}


export default NatigationTab