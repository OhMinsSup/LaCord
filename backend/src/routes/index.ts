import * as Router from 'koa-router';
import auth from './auth';
import post from './post';
import file from './file';

const router = new Router();

router.use('/auth', auth.routes());
router.use('/post', post.routes());
router.use('/file', file.routes());

// test api
router.get('/', ctx => {
  ctx.set('content-type', 'application/json');
  ctx.body = {
    payload: 'Hello Jest',
  };
});

export default router;
