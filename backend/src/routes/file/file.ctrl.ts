import { Middleware, Context } from 'koa';
import { getCustomRepository } from 'typeorm';
import * as fs from 'fs';
import PostRepository from '../../database/repository/PostRepository';
import * as config from '../../config/config';
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: config.CLOUDINARY_CLOUD_NAME,
  api_key: config.CLOUDINARY_APIKEY,
  api_secret: config.CLOUDINARY_API_SECRET,
});

export const createPostImageSignedUrl: Middleware = async (
  ctx: Context
): Promise<any> => {
  const { files, fileds } = ctx.request.body;
  const { image } = files;
  const { postId } = fileds;

  if (!image) {
    ctx.status = 400;
    ctx.body = {
      name: 'File',
      payload: '파일을 전달해 줘야합니다',
    };
    return;
  }

  const stats = fs.statSync(image.path);

  if (!stats) {
    ctx.throw(500, 'failed to load stats');
    return;
  }

  if (stats.size > 1024 * 1024 * 8) {
    ctx.status = 403;
    ctx.body = {
      name: 'FILE_SIZE_EXCEEDS',
      payload: '8MB',
    };
    return;
  }

  if (!postId) {
    ctx.status = 400;
    ctx.body = {
      name: 'Post',
      payload: '포스트 ID을 전달해 줘야합니다',
    };
    return;
  }

  const postCustomRespository = await getCustomRepository(PostRepository);

  try {
    const post = await postCustomRespository.findById(postId);

    if (!post) {
      ctx.status = 404;
      ctx.body = {
        name: 'Post',
        payload: '포스트가 존재하지 않습니다',
      };
      return;
    }

    const splitFileName: string[] = image.name.split('.');
    const filename: string = splitFileName[0];

    const response = await cloudinary.v2.uploader.upload(image.path, {
      public_id: `lacord/post-image/${ctx['user'].username}/${
        post.id
      }/${filename}`,
    });

    if (!response) {
      ctx.status = 418;
      ctx.body = {
        name: 'UPLOAD',
        payload: '파일 업로드에 실패하였습니다',
      };
    }

    ctx.body = {
      url: response.url,
      path: `lacord/post-image/${ctx['user'].username}/${post.id}/${filename}`,
      name: filename,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const createCommonThumbnailSignedUrl: Middleware = async (
  ctx: Context
): Promise<any> => {
  const { files } = ctx.request.body;
  const { image } = files;

  if (!image) {
    ctx.status = 400;
    ctx.body = {
      name: 'File',
      payload: '파일을 전달해 줘야합니다',
    };
    return;
  }

  const stats = fs.statSync(image.path);

  if (!stats) {
    ctx.throw(500, 'failed to load stats');
    return;
  }

  if (stats.size > 1024 * 1024 * 8) {
    ctx.status = 403;
    ctx.body = {
      name: 'FILE_SIZE_EXCEEDS',
      payload: '8MB',
    };
    return;
  }

  try {
    const splitFileName: string[] = image.name.split('.');
    const filename: string = splitFileName[0];

    const response = await cloudinary.v2.uploader.upload(image.path, {
      public_id: `lacord/common-thumbnail/${ctx['user'].username}/${filename}`,
      width: 100,
      height: 100,
    });

    if (!response) {
      ctx.status = 418;
      ctx.body = {
        name: 'UPLOAD',
        payload: '파일 업로드에 실패하였습니다',
      };
    }

    ctx.body = {
      url: response.url,
      path: `lacord/common-thumbnail/${ctx['user'].username}/${filename}`,
      name: filename,
    };
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const createCommonVideoSignedUrl: Middleware = async (
  ctx: Context
): Promise<any> => {
  ctx.body = '비디오';
};
