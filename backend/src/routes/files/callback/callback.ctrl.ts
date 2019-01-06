import { Middleware, Context } from 'koa';
import { google } from 'googleapis';
import * as crypto from 'crypto';
import { GOOGLE_CLIENT_KEY, GOOGLE_SECRET_KEY } from '../../../config/config';

export const redirectGoogleDriveLogin: Middleware = (ctx: Context) => {
  const callbackUrl = 'http://localhost:4500/files/callback/google';

  if (!GOOGLE_CLIENT_KEY || !GOOGLE_SECRET_KEY) {
    console.log('Google ENVVAR is missing');
    ctx.throw(500);
    return;
  }

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_KEY,
    GOOGLE_SECRET_KEY,
    callbackUrl
  );

  const url = oauth2Client.generateAuthUrl({
    scope: ['https://www.googleapis.com/auth/drive.metadata.readonly'],
  });

  ctx.redirect(url);
};

export const callbackGoogleDrive: Middleware = async (ctx: Context) => {
  type QueryPayload = {
    code: string;
  };

  const { code }: QueryPayload = ctx.query;
  const callbackUrl = 'http://localhost:4500/files/callback/google';

  if (!code) {
    ctx.redirect(`http://localhost:4500/?callback?error=1`);
    return;
  }

  if (!GOOGLE_CLIENT_KEY || !GOOGLE_SECRET_KEY) {
    console.log('Google ENVVAR is missing');
    ctx.throw(500);
    return;
  }

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_KEY,
    GOOGLE_SECRET_KEY,
    callbackUrl
  );

  try {
    const drive = google.drive({
      version: 'v3',
      auth: oauth2Client,
    });

    /*
      참고 사이트 https://developers.google.com/picker/docs/
      https://github.com/googleapis/google-api-nodejs-client
      const hash = crypto.randomBytes(40).toString('hex');
      let nextUrl = `http://localhost:4500/callback?type=google&key=${hash}`;
      ctx.redirect(encodeURI(nextUrl));
    */
  } catch (e) {
    ctx.throw(500, e);
  }

  const drive = google.drive({ version: 'v3' });
};
