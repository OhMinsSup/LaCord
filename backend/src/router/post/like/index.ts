import * as Router from 'koa-router';
import * as likeCtrl from './like.ctrl';
import needAuth from '../../../lib/middlewares/needAuth';

const like: Router = new Router();

like.post('/', needAuth, likeCtrl.likePost);
like.delete('/', needAuth, likeCtrl.unlikePost);

export default like;