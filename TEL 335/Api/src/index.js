import Koa from 'koa';
import bodyParser from 'koa-body';
import router from './routes/index';
import cors from '@koa/cors';

const app = new Koa();
const port = 3000;

app.use(cors()); // Habilita CORS para todas las solicitudes
app.use(bodyParser({ multipart: true, urlencoded: true }));
app.use(router.routes());

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
