import * as Router from 'koa-router';
import needAuth from '../../lib/middlewares/needAuth';
import * as fileCtrl from '../file/file.ctrl';

const file = new Router();

file.post(
  '/create-url/post-image',
  needAuth,
  fileCtrl.createPostImageSignedUrl
);
file.post(
  '/create-url/common-thumbnail',
  needAuth,
  fileCtrl.createCommonThumbnailSignedUrl
);
file.post(
  '/create-url/common-videos',
  needAuth,
  fileCtrl.createCommonVideoSignedUrl
);

export default file;
