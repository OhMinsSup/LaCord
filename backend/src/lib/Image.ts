import * as Jimp from 'jimp';
import * as os from 'os';
import { ImageOptions, ImageType } from '../types/types';

class Image {
  private name: string;
  private type: ImageType;
  private file_path?: string;
  private file_url?: string;

  constructor(self: ImageOptions) {
    let name = null;

    if (self.name) {
      const splitName = self.name.split('.');
      name = splitName[0];
    }

    this.name = name;
    this.type = self.type;
    this.file_path = self.file_path;
    this.file_url = self.file_url;
  }

  public async convert_v1() {
    const { type, file_path, file_url } = this;

    try {
      if (file_path) {
        const result = await Jimp.read(file_path);
        return result.clone().write(`${os.homedir()}\\${this.name}.${type}`);
      } else {
        const result = await Jimp.read(file_url);
        return result.writeAsync(
          !this.name
            ? `${os.homedir()}\\${Math.random()
                .toString(36)
                .slice(2)}.${type}`
            : `${os.homedir()}\\${this.name}`
        );
      }
    } catch (e) {
      throw new Error(e);
    }
  }
}

export default Image;
