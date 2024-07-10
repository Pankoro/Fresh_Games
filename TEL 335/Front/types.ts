export type RootStackParamList = {
  MainScreen: undefined; // Asegúrate de que este nombre coincida con el que has usado en MainStackNavigator
  CreatePost: undefined;
  PostList: undefined;
  PostDetail: { postId: string };
  EditPost: { postId: string };
  AddComment: { postId: string };
  UserProfile: undefined;
  EditProfile: undefined;
  Search: undefined;
  UserValidation: undefined;
  Auth: undefined; // Añadido para el AuthStackNavigator
  MainApp: undefined; // Añadido para el MainStackNavigator en AppNavigator
  EditComment: { postId: string; commentId: string; commentText: string};
};
