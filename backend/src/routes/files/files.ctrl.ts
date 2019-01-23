import { Middleware, Context } from 'koa';
import * as fs from 'fs';
import Convert from '../../lib/convert';
import { ImageType, YouTudeType } from '../../types/types';

export const convertFile: Middleware = async (ctx: Context) => {
  type BodySchema = {
    type: ImageType | YouTudeType;
    name: string | null;
    url: string | null;
  };

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
      const convert = await new Convert({
        name: file.name,
        type,
        file_path: file.path,
        file_url: null,
      });

      const result = await convert.imageConvert();

      if (!result) {
        ctx.status = 404;
        ctx.body = {
          name: 'CONVERT ERROR',
          payload: '파일이 변환되지 않음',
        };
        return;
      }

      ctx.status = 204;
      return;
    } catch (e) {
      ctx.throw(500, e);
    }
  }

  try {
    const convert = await new Convert({
      name,
      type,
      file_path: null,
      file_url: url,
    });

    const result = await convert.imageConvert();

    if (!result) {
      ctx.status = 404;
      ctx.body = {
        name: 'CONVERT ERROR',
        payload: '파일이 변환되지 않음',
      };
      return;
    }

    ctx.status = 204;
  } catch (e) {
    ctx.throw(500, e);
  }
};
