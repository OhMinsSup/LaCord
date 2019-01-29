import * as Jimp from 'jimp';

import { ImageOptions, ImageType } from '../types/types';

class Image {
  private app: Jimp = null;

  private name: string;
  private type: ImageType;
  private file_path?: string;
  private file_url?: string;

  constructor(self: ImageOptions) {
    const splitName = self.name.split('.');
    const name = splitName[0];

    this.name = name;
    this.type = self.type;
    this.file_path = self.file_path;
    this.file_url = self.file_url;
  }

  public async convert_v1() {
    const { type, file_path, name, file_url, app } = this;
    try {
      const result = await app.read(file_path ? file_path : file_url);

      return result.clone().write(`C:\\Locard-convert\\${name}.${type}`);
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default Image;
