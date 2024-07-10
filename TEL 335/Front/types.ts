export type RootStackParamList = {
  MainScreen: undefined;
  CreatePost: undefined;
  PostList: undefined;
  PostDetail: { postId: string };
  EditPost: { postId: string };
  AddComment: { postId: string };
  UserProfile: undefined;
  EditProfile: undefined;
  Search: undefined;
  UserValidation: undefined;
  Auth: undefined;
  MainApp: undefined;
  EditComment: { postId: string; commentId: string; commentText: string };
  OtherUser: { userId: string ; userName: string}; 
};
