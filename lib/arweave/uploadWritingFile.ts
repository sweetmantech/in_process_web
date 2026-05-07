import { uploadViaApi, type UploadResult } from "./uploadViaApi";

export const uploadWritingFile = async (
  content: string,
  authHeaders: HeadersInit,
  getRecaptchaToken: () => Promise<string | undefined>
): Promise<UploadResult> => {
  const blob = new Blob([content], { type: "text/plain" });
  const writingFile = new File([blob], "writing.txt", { type: "text/plain" });
  return uploadViaApi(writingFile, authHeaders, getRecaptchaToken);
};
