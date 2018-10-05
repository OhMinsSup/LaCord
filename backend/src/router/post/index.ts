import * as Router from 'koa-router';
import * as postCtrl from './post.ctrl';
import needAuth from '../../lib/middlewares/needAuth';
import like from './like';
import comment from './comment';
import { checkPostExistancy } from '../../lib/common';

const post = new Router();

post.post('/', needAuth, postCtrl.writePost);
post.patch('/:id', needAuth, checkPostExistancy ,postCtrl.updatePost);
post.delete('/:id', needAuth, checkPostExistancy, postCtrl.deletePost);

post.use('/:id/comment', needAuth, comment.routes());
post.use('/:id/like', needAuth, like.routes());

export default post;