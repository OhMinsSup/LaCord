import * as Router from 'koa-router';
import * as postsCtrl from './posts.ctrl';

const posts = new Router();

posts.get('/@:username', postsCtrl.listPosts);
posts.get('/public', postsCtrl.listPosts);

export default posts;
