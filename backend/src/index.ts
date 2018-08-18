import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import routes from './router';
import db from'./database/db';
import { PORT } from './config/config';
import tokenMiddleware from './lib/middlewares/tokenMiddleware';
import cors from './lib/middlewares/cors';

const app = new Koa();

db();

app.use(cors);
app.use(tokenMiddleware);
app.use(koaBody({
    multipart: true
}));

app.use(routes.routes()).use(routes.allowedMethods());
    
app.listen(PORT, () => {
    console.log(`LaCord HTTP Server running on port ${PORT} ✅`);
});

