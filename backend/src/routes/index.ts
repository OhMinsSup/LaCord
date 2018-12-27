import * as Router from 'koa-router';
import auth from './auth';

const router = new Router();

router.use('/auth', auth.routes());

// test api
router.get('/', ctx => {
  ctx.set('content-type', 'application/json');
  ctx.body = {
    payload: 'Hello Jest',
  };
});

export default router;
