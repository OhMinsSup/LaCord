export type ImageType = 'jpeg' | 'bmp' | 'tiff' | 'png' | 'gif';
export type YouTudeType = 'mp3' | 'mp4';
export type QualityType =
  | 'highest'
  | 'lowest'
  | 'highestaudio'
  | 'lowestaudio'
  | 'highestvideo'
  | 'lowestvideo';

export interface UserToken {
  id: string;
  username: string;
  email: string;
  thumbnail: string;
}

export interface ImageOptions {
  type: ImageType;
  name: string;
  file_path?: string;
  file_url?: string;
}

export interface YouTudeOptions {
  type: YouTudeType;
  name: string;
  url: string;
  quality: QualityType;
}
