import * as Router from 'koa-router';
import * as authCtrl from './auth.ctrl';

const auth = new Router();

auth.post('/register/local', authCtrl.localRegister);
auth.post('/login/local', authCtrl.localLogin);
auth.post('/logout', authCtrl.logout);
auth.get('/check', authCtrl.check);
auth.get('/exists/:key(email|username)/:value', authCtrl.exists);

export default auth;
