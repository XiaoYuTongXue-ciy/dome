export interface UploadApiResult {
  message: string;
  code: number;
  result: {
    fileName: string;
    id: string;
    name: string;
    url: string;
  };
}
