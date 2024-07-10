import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PostDetailScreen from '../screens/PostDetailScreen';
import EditPostScreen from '../screens/EditPostScreen';
import AddCommentScreen from '../screens/AddCommentScreen';
import EditCommentScreen from '../screens/EditCommentScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import UserValidationScreen from '../screens/UserValidationScreen';
import NatigationTab from "./NatigationTab";
import { RootStackParamList } from '../types';

const Stack = createStackNavigator();

const InternalNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="PostDetail" component={PostDetailScreen} />
            <Stack.Screen name="EditPost" component={EditPostScreen} />
            <Stack.Screen name="AddComment" component={AddCommentScreen} />
            <Stack.Screen name="EditComment" component={EditCommentScreen} />
            <Stack.Screen name="EditProfile" component={EditProfileScreen} />
            <Stack.Screen name="UserValidation" component={UserValidationScreen} />
        </Stack.Navigator>
    );
}

export default InternalNavigation;
