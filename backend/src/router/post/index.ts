import * as Router from 'koa-router';
import * as postCtrl from './post.ctrl';
import needAuth from '../../lib/middlewares/needAuth';
import like from './like';

const post = new Router();

post.post('/', needAuth, postCtrl.writePost);
post.patch('/', needAuth, postCtrl.updatePost);

post.use('/:id/like', needAuth, like.routes());

export default post;