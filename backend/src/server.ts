import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import routes from './router';
import { connect } from'./database/db';
import tokenMiddleware from './lib/middlewares/tokenMiddleware';
import cors from './lib/middlewares/cors';

const app = new Koa();
//  init database
connect();

app.use(cors);
app.use(tokenMiddleware);
app.use(koaBody({
    multipart: true
}));
app.use(routes.routes()).use(routes.allowedMethods());

export default app;
