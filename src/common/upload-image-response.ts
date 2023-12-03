import { UploadApiErrorResponse as UploadImageErrorResponse } from 'cloudinary';

interface UploadImageSuccessResponse {
  id: string;
  url: string;
  secure_url: string;
  width: number;
  height: number;
  format: string;
}

export type UploadImageResponse =
  | UploadImageErrorResponse
  | UploadImageSuccessResponse;
