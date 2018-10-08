import * as Router from 'koa-router';
import * as likeCtrl from './like.ctrl';

const like: Router = new Router();

like.post('/', likeCtrl.likePost);
like.delete('/', likeCtrl.unlikePost);
like.get('/', likeCtrl.getLike);

export default like;