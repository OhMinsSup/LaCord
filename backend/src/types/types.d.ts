export type ImageType = 'jpeg' | 'bmp' | 'tiff' | 'png' | 'gif';
export type YouTudeType = 'mp3' | 'mp4';

export interface CustomOption {
  resize: {
    x: number;
    y: number;
  } | null;
}

export interface BasicOption {
  type: ImageType | YouTudeType | null;
  name: string | null;
  file_path: string | null;
  file_url: string | null;
}

export interface UserToken {
  id: string;
  username: string;
  email: string;
  thumbnail: string;
}
