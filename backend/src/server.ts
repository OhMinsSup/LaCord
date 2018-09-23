import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import routes from './router';
import database from'./database/db';
import tokenMiddleware from './lib/middlewares/tokenMiddleware';
import cors from './lib/middlewares/cors';

class Server {
    public app: Koa;

    constructor() {
        this.app = new Koa();
        this.initializeDb();
        this.middleware();
        this.routes();
    }
    private initializeDb(): void {
        if (!database.connected) {
            database.connect();
        } else {
            console.log('database connection...');
        }
    }

    private middleware(): void {
        const { app } = this;

        app.use(cors);
        app.use(tokenMiddleware);
        app.use(koaBody({
            multipart: true
        }));
    }

    private routes(): void {
        const { app } = this;
        app.use(routes.routes()).use(routes.allowedMethods());
    }
}

export default new Server().app;
