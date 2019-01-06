import * as Router from 'koa-router';
import * as filesCtrl from './files.ctrl';
import callback from './callback';

const files = new Router();

files.post('/', filesCtrl.convert);
files.use('/callback', callback.routes());

export default files;
