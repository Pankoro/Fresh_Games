import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import PostDetailScreen from '../screens/PostDetailScreen';
import EditPostScreen from '../screens/EditPostScreen';
import AddCommentScreen from '../screens/AddCommentScreen';
import EditCommentScreen from '../screens/EditCommentScreen';
import EditProfileScreen from '../screens/EditProfileScreen';
import UserValidationScreen from '../screens/UserValidationScreen';
import NatigationTab from "./NatigationTab";
import OtherUserProfileScreen from '../screens/OtherUserProfileScreen';
import InternalNavigation from "./InternalNavigation";
import { RootStackParamList } from '../types';

const Stack = createStackNavigator<RootStackParamList>();

const MainStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator >
        <Stack.Screen options={{headerShown:false}} name="MainScreen" component={NatigationTab} />
        <Stack.Screen options={{headerShown:true}} name="OtherUser" component={OtherUserProfileScreen} />
        <Stack.Screen options={{headerShown:true, title:'Detalle de la publicación'}} name="PostDetail" component={PostDetailScreen} />
        <Stack.Screen options={{headerShown:true}} name="EditPost" component={EditPostScreen} />
        <Stack.Screen options={{headerShown:true, title:'Agreagar comentario'}} name="AddComment" component={AddCommentScreen} />
        <Stack.Screen options={{headerShown:true, title:'Editar comentario'}} name="EditComment" component={EditCommentScreen} />
        <Stack.Screen options={{headerShown:true, title:'Editar perfil'}} name="EditProfile" component={EditProfileScreen} />
        <Stack.Screen options={{headerShown:true}} name="UserValidation" component={UserValidationScreen} />
    </Stack.Navigator>
  );
}

export default MainStackNavigator;
