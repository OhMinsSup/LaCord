import * as ytdl from 'ytdl-core';
import * as fs from 'fs';
import { Readable } from 'stream';

import { YouTudeOptions, YouTudeType, QualityType } from '../types/types';

class Youtube {
  private app: Readable;

  private name: string;
  private type: YouTudeType;
  private url: string;
  private quality: QualityType = 'highest';

  constructor(self: YouTudeOptions) {
    this.name = self.name;
    this.type = self.type;
    this.url = self.url;
    this.quality = self.quality;
  }

  public convert_v1() {
    const { url, name, type, quality } = this;

    if (type === 'mp3') {
      this.app = ytdl(url, {
        quality,
      });
      this.app.pipe(fs.createWriteStream(`C:\\Locard-convert\\${name}.mp3`));
      this.app.on('error', err => {
        throw err;
      });
      this.app.on('end', () => {
        console.log(
          '유튜브 파일을 MP3 형태로 변환하는 것에 성공하였습니다. ✅'
        );
        console.log(`C:\\Locard-convert\\${name}.mp3`);
      });
      return;
    }

    this.app = ytdl(url, {
      quality,
      filter: format => format.container === 'mp4',
    });

    this.app.pipe(fs.createWriteStream(`C:\\Locard-convert\\${name}.mp4`));
    this.app.on('error', err => {
      throw err;
    });
    this.app.on('end', () => {
      console.log('유튜브 파일을 MP4 형태로 변환하는 것에 성공하였습니다. ✅');
      console.log(`C:\\Locard-convert\\${name}.mp4`);
    });
  }
}

export default Youtube;
