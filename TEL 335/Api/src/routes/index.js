import Router from 'koa-router'
import getHealth from './health/health'
import users from './user/user'
import comments from './comments/comments'
import publicaciones from './publicaciones/publicaciones'
//import {removeUser} from './user/user'

const router = new Router()

router.get('/health', getHealth)

//USERS
router.get('/api/users', users.getAllUsers)
router.get('/api/user/:nameUser', users.getUser)
router.get('/api/user/mail/:nameUser', users.getMail)
router.get('/api/user/mail/:nameUser/:mail', users.getUserWithTwoParams)
router.post('/api/user', users.createUser)
router.put('/api/userupdate/:nameUser', users.updateUser)
router.delete('/api/user/:userMail', users.removeUser)
router.post('/api/authenticate',users.authenticate)
router.get('/api/user/checkname/:name', users.checkDuplicateUser)


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
