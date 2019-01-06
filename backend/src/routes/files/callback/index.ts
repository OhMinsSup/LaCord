import * as Router from 'koa-router';
import * as callbackCtrl from './callback.ctrl';

const callback = new Router();

callback.get('/google/login', callbackCtrl.redirectGoogleDriveLogin);
callback.get('/google', callbackCtrl.callbackGoogleDrive);

export default callback;
