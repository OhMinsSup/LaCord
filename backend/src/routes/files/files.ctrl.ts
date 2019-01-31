import { Middleware, Context } from 'koa';
import * as fs from 'fs';

import Image from '../../lib/Image';
import Youtube from '../../lib/Youtube';

import { ImageType, YouTudeType, UserToken } from '../../types/types';
import {
  CLOUDINARY_APIKEY,
  CLOUDINARY_API_SECRET,
  CLOUDINARY_CLOUD_NAME,
} from '../../config/config';
import { getCustomRepository } from 'typeorm';
import UserRepository from '../../database/repository/UserRepository';

const cloudinary = require('cloudinary');
cloudinary.config({
  cloud_name: CLOUDINARY_CLOUD_NAME,
  api_key: CLOUDINARY_APIKEY,
  api_secret: CLOUDINARY_API_SECRET,
});

export const createThumbnailSignedUrl: Middleware = async (ctx: Context) => {
  const { thumbnail } = ctx.request.files;
  const user: UserToken = ctx['user'];
  const userCustomRespository = await getCustomRepository(UserRepository);

  if (!user) {
    ctx.status = 401;
    return;
  }

  if (!thumbnail) {
    ctx.status = 400;
    ctx.body = {
      name: 'File',
      payload: '파일을 전달해 줘야합니다',
    };
    return;
  }

  const stats = fs.statSync(thumbnail.path);

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

  const splitFileName: string[] = thumbnail.name.split('.');
  const filename: string = splitFileName[0];

  try {
    const response = await cloudinary.v2.uploader.upload(thumbnail.path, {
      public_id: `LaCord/thumbnail/${user.username}/${filename}`,
      width: 128,
      height: 128,
    });

    if (!response) {
      ctx.status = 418;
      ctx.body = {
        name: 'UPLOAD',
        payload: '파일 업로드에 실패하였습니다',
      };
      return;
    }

    const result = await userCustomRespository.updateThumbnail(
      response.secure_url,
      user.id
    );

    if (!result) {
      ctx.status = 400;
      return;
    }

    ctx.status = 200;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const convertFile: Middleware = async (ctx: Context) => {
  type BodySchema = {
    type: ImageType;
  };

  const {
    files: { file },
    body,
  } = ctx.request;
  const { type }: BodySchema = body;

  try {
    const state = fs.statSync(file.path);
    if (!state) {
      ctx.throw(500, 'failed to load stats');
      return;
    }

    const convert = new Image({
      name: file.name,
      type,
      file_path: file.path,
      file_url: null,
    });

    const result = await convert.convert_v1();

    if (!result) {
      ctx.status = 404;
      ctx.body = {
        name: 'CONVERT ERROR',
        payload: '파일이 변환되지 않음',
      };
      return;
    }

    ctx.status = 200;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const convertUrl: Middleware = async (ctx: Context) => {
  type BodySchema = {
    type: ImageType;
    name: string;
    url: string;
  };

  const { type, url, name }: BodySchema = ctx.request.body;

  try {
    const convert = new Image({
      name,
      type,
      file_path: null,
      file_url: url,
    });

    const result = await convert.convert_v1();

    if (!result) {
      ctx.status = 404;
      ctx.body = {
        name: 'CONVERT ERROR',
        payload: '파일이 변환되지 않음',
      };
      return;
    }

    ctx.status = 200;
  } catch (e) {
    ctx.throw(500, e);
  }
};

export const convertYoutube: Middleware = (ctx: Context) => {
  type BodySchema = {
    url: string;
    name: string;
    type: YouTudeType;
  };
  const { url, name, type }: BodySchema = ctx.request.body;

  try {
    const convert = new Youtube({
      name,
      type,
      url,
    });

    convert.convert_v1();

    ctx.status = 200;
  } catch (e) {
    ctx.throw(500, e);
  }
};
