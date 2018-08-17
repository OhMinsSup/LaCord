import * as Koa from 'koa';
import * as koaBody from 'koa-body';
import routes from './router';
import db from'./database/db';
import { PORT } from './config/config';

db.then(async (c) => {
    if (c) {
        console.log('Typeorm => LaCord DB connetion ✅');
    }
    
    const app = new Koa();

    app.use(koaBody({
        multipart: true
    }));
    
    app.use(routes.routes()).use(routes.allowedMethods());
    
    app.listen(PORT, () => {
        console.log(`LaCord HTTP Server running on port ${PORT} ✅`);
    });
})
.catch(e => {
    console.log(e);
})
