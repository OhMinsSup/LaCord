import * as Router from 'koa-router';
import auth from './auth';

const router = new Router();

import { getElevation } from '../lib/GoogleMap';

router.use('/auth', auth.routes());

// test api
router.get('/', (ctx) => {
    ctx.body = 'test';
});

router.get('/test', async (ctx) => {
    const data = [{
        lat: 40.71189,
        lng: -111.96794
      }, {
        lat: 40.71189,
        lng: -112.9679
      }]
    const a = await getElevation(data);

    ctx.body = a;
})

export default router;