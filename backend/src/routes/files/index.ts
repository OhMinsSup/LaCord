import * as Router from 'koa-router';
import * as filesCtrl from './files.ctrl';
import needAuth from '../../lib/middlewares/needAuth';

const files = new Router();

files.post('/convert-file', filesCtrl.convertFile);
files.post('/convert-url', filesCtrl.convertUrl);
files.post('/convert-youtube', needAuth, filesCtrl.convertYoutube);

export default files;
