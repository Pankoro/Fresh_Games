import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import AuthStackNavigator from './AuthStackNavigator';
import MainStackNavigator from './MainStackNavigator';
import LoginScreen from '../screens/LoginScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Auth" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Auth" component={AuthStackNavigator} />
      <Stack.Screen name="MainApp" component={MainStackNavigator} />
    </Stack.Navigator>
  );
}

export default AppNavigator;
