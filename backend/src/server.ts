import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import * as koaServe from 'koa-static';
import * as path from 'path';
import routes from './router';
import { connect } from'./database/db';
import tokenMiddleware from './lib/middlewares/tokenMiddleware';
import cors from './lib/middlewares/cors';

const app = new Koa();
const staticPath = path.join(__dirname, '../.webpack/bundle.js');
//  inti database
connect();

app.use(cors);
app.use(tokenMiddleware);
app.use(koaBody({
    multipart: true
}));
app.use(routes.routes()).use(routes.allowedMethods());
app.use(koaServe(staticPath));

export default app;
