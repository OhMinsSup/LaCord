import convertapiPackage from 'convertapi';
import * as os from 'os';
import { CONVERT_API_SECRET } from '../config/config';
import { IBasicOption, V1_Type, V2_Type } from '../types/types';

const convertapi = convertapiPackage(CONVERT_API_SECRET);
// const dir = os.tmpdir();

class File {
  private access: 'v1' | 'v2' | null;
  private type: V1_Type | V2_Type | null;
  private file_path: string | null;
  private file_url: string | null;

  constructor(option: IBasicOption) {
    const { v1_type, v2_type, file_path, file_url } = option;

    this.type = v1_type ? v1_type : v2_type;
    this.access = v1_type ? 'v1' : 'v2';
    this.file_path = file_path;
    this.file_url = file_url;
  }

  private async convertV1(): Promise<any> {
    const { type, file_path, file_url } = this;

    let result = null;

    if (file_path && !file_url) {
      try {
        result = await convertapi.convert(type, {
          File: file_path,
        });
        return result.save();
      } catch (e) {
        throw new Error(e);
      }
    }

    try {
      result = await convertapi.convert(type, {
        Url: file_url,
      });

      return result.save();
    } catch (e) {
      throw new Error(e);
    }
  }

  private async convertV2(): Promise<any> {
    const { type, file_path, file_url } = this;
  }

  public getConvert(): void {
    const { access } = this;

    if (access === 'v1') {
      this.convertV1();
    } else if (access === 'v2') {
      this.convertV2();
    }
  }
}

export default File;
