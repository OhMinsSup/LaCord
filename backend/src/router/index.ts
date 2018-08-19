import * as Router from 'koa-router';
import auth from './auth';

const router = new Router();

router.use('/auth', auth.routes());

// test api
router.get('/', (ctx) => {
    ctx.body = 'test';
});

export default router;