import * as Router from 'koa-router';
import * as postCtrl from './post.ctrl';
import needAuth from '../../lib/middlewares/needAuth';

const post = new Router();

post.post('/', needAuth, postCtrl.writePost);

export default post;