import { uploadViaApi, type UploadResult } from "./uploadViaApi";
import type { UploadClient } from "@/types/upload";

export const uploadWritingFile = async (
  content: string,
  client: UploadClient
): Promise<UploadResult> => {
  const blob = new Blob([content], { type: "text/plain" });
  const writingFile = new File([blob], "writing.txt", { type: "text/plain" });
  return uploadViaApi(writingFile, client);
};
