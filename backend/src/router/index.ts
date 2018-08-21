import * as Router from 'koa-router';
import auth from './auth';
import post from './post';

const router = new Router();

router.use('/auth', auth.routes());
router.use('/post', post.routes());

// test api
router.get('/', (ctx) => {
    ctx.body = 'test';
});

export default router;