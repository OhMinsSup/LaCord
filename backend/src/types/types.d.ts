export type V1_Type = 'jpg' | 'pdf' | 'pdfa' | 'png' | 'tiff' | 'zip';
export type V2_Type = 'html' | 'doc' | 'docx' | 'xls';

export interface IBasicOption {
  v1_type: V1_Type | null;
  v2_type: V2_Type | null;
  file_path: string | null;
  file_url: string | null;
}

export interface IUserToken {
  id: string;
  username: string;
  email: string;
  thumbnail: string;
}
