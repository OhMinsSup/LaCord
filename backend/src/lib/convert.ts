import { BasicOption, ImageType, YouTudeType } from '../types/types';
import * as Jimp from 'jimp';

class Convert {
  private name: string | null = null;
  private type: ImageType | YouTudeType | null = null;
  private file_path: string | null = null;
  private file_url: string | null = null;

  constructor(self: BasicOption) {
    const splitName = self.name.split('.');
    const name = splitName[0];

    this.name = name;
    this.type = self.type;
    this.file_path = self.file_path;
    this.file_url = self.file_url;
  }

  public async imageConvert() {
    const { type, file_path, file_url, name } = this;

    try {
      const result = await Jimp.read(file_path ? file_path : file_url);

      return result.clone().write(`C:\\Locard-convert\\${name}.${type}`);
    } catch (e) {
      throw new Error(e);
    }
  }

  public youtudeCovert() {
    console.log('as');
  }
}

export default Convert;
