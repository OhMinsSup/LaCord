import * as Router from 'koa-router';
import auth from './auth';
import post from './post';

const router = new Router();

router.use('/auth', auth.routes());
router.use('/post', post.routes());

// test api
router.get('/', (ctx) => {
    ctx.set('content-type', 'application/json');
    ctx.body = {
        payload: 'Hello Jest'
    };
});

export default router;