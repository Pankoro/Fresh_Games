import Router from 'koa-router'
import getHealth from './health/health'
import userRoutes from './user/user'
import comments from './comments/comments'
import publicaciones from './publicaciones/publicaciones'
//import {removeUser} from './user/user'

const router = new Router()

router.get('/health', getHealth)

// Users
router.get('/api/users', userRoutes.getAllUsers);
router.get('/api/users/:nameUser', userRoutes.getUser);
router.get('/api/users/:nameUser/mail', userRoutes.getMail);
router.get('/api/users/:nameUser/:mail', userRoutes.getUserWithTwoParams);
router.post('/api/users', userRoutes.createUser);
router.put('/api/users/:nameUser', userRoutes.updateUser);
router.delete('/api/users/:userMail', userRoutes.removeUser);
router.post('/api/users/authenticate', userRoutes.authenticate);
router.get('/api/users/check-duplicate/:name', userRoutes.checkDuplicateUser);
router.put('/api/users/:nameUser/increment-report', userRoutes.incrementUserReports);


// COMMENTS
router.get('/api/comments/:postId', comments.getCommentsByPostId);
router.post('/api/comments', comments.addComment);
router.delete('/api/comments/:postId/:commentId', comments.removeComment);
router.put('/api/comments/:postId/:commentId', comments.updateComment);

//PUBLICACIONES
router.get('/api/publicaciones', publicaciones.getAllPublicaciones);
router.get('/api/publicacion/:publicacionName', publicaciones.getPublicacionByName);
router.post('/api/publicacion', publicaciones.createPublicacion);
router.put('/api/publicacion/:publicacionName', publicaciones.updatePublicacion);
router.delete('/api/publicacion/:publicacionName', publicaciones.removePublicacion);
router.get('/api/publicaciones/search', publicaciones.searchPublicaciones);
router.get('/api/publicaciones/:publicacionKey', publicaciones.getPublicacionByKey);

 
export default router
