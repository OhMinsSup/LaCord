import * as Router from 'koa-router';
import * as userCtrl from './user.ctrl';
import needAuth from '../../lib/middlewares/needAuth';

const user = new Router();

user.get('/unregister-token', needAuth, userCtrl.generateUnregisterToken);
user.post('/unregister', needAuth, userCtrl.unregister);

export default user;
