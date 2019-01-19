import * as Router from 'koa-router';
import * as filesCtrl from './files.ctrl';

const files = new Router();

files.post('/convert-file', filesCtrl.convertFile);

export default files;
