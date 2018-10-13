import * as Router from 'koa-router';
import * as commentCtrl from './comment.ctrl';

const comment = new Router();

comment.post('/', commentCtrl.writeComment);
comment.put('/:commmentId', commentCtrl.updateComment);
comment.delete('/:commentId', commentCtrl.deleteComment);

export default comment;
