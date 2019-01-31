import * as Router from 'koa-router';
import auth from './auth';
import files from './files';
import user from './user';

const router = new Router();

router.use('/auth', auth.routes());
router.use('/files', files.routes());
router.use('/user', user.routes());

// test api
router.get('/', ctx => {
  ctx.set('content-type', 'application/json');
  ctx.body = 'test';
});

export default router;
