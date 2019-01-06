import * as Router from 'koa-router';
import auth from './auth';
import files from './files';

const router = new Router();

router.use('/auth', auth.routes());
router.use('/files', files.routes());

// test api
router.get('/', ctx => {
  ctx.set('content-type', 'application/json');
  ctx.body = {
    payload: 'Hello Jest',
  };
});

export default router;
