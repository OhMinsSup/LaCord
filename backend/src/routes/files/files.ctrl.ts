import { Middleware, Context } from 'koa';
import * as fs from 'fs';

import Image from '../../lib/Image';
import Youtube from '../../lib/Youtube';

import { ImageType, YouTudeType } from '../../types/types';

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
