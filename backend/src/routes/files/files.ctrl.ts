import { Middleware, Context } from 'koa';
import * as fs from 'fs';
import * as Joi from 'joi';

import Image from '../../lib/Image';
import Youtube from '../../lib/Youtube';

import { ImageType, YouTudeType, QualityType } from '../../types/types';

export const convertFile: Middleware = async (ctx: Context) => {
  type BodySchema = {
    type: ImageType;
    name: string;
    url: string;
  };

  const schema = Joi.object().keys({
    type: Joi.string()
      .valid('jpeg', 'bmp', 'tiff', 'png', 'gif')
      .required(),
    url: Joi.string().uri(),
    name: Joi.string(),
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 404;
    ctx.body = result.error;
    return;
  }

  const {
    files: { file },
    body,
  } = ctx.request;
  const { type, url, name }: BodySchema = body;

  if (file) {
    const state = fs.statSync(file.path);
    if (!state) {
      ctx.throw(500, 'failed to load stats');
      return;
    }

    try {
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
      return;
    } catch (e) {
      ctx.throw(500, e);
    }
  }

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
    quality: QualityType;
  };

  const schema = Joi.object().keys({
    url: Joi.string()
      .uri()
      .required(),
    name: Joi.string().required(),
    type: Joi.string()
      .valid('mp3', 'mp4')
      .required(),
    quality: Joi.string().valid(
      'highest',
      'lowest',
      'highestaudio',
      'lowestaudio',
      'highestvideo',
      'lowestvideo'
    ),
  });

  const result = Joi.validate(ctx.request.body, schema);

  if (result.error) {
    ctx.status = 404;
    ctx.body = result.error;
    return;
  }

  const { url, name, type, quality }: BodySchema = ctx.request.body;

  try {
    const convert = new Youtube({
      name,
      type,
      url,
      quality,
    });

    convert.convert_v1();

    ctx.status = 200;
  } catch (e) {
    ctx.throw(500, e);
  }
};
