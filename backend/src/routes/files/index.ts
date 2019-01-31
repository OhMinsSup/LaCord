import * as Router from 'koa-router';
import * as filesCtrl from './files.ctrl';

const files = new Router();

files.post('/convert-file', filesCtrl.convertFile);
files.post('/convert-url', filesCtrl.convertUrl);
files.post('/convert-youtube', filesCtrl.convertYoutube);

export default files;
