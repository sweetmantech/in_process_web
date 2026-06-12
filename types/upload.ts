export interface UploadClient {
  headers: HeadersInit;
  recaptcha: () => Promise<string | undefined>;
}
