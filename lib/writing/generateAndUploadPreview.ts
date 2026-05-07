import { uploadViaApi, type UploadResult } from "@/lib/arweave/uploadViaApi";
import { generateTextPreview } from "./generateTextPreview";

export const generateAndUploadPreview = async (
  writingText: string,
  authHeaders: HeadersInit
): Promise<UploadResult | null> => {
  if (!writingText.trim()) return null;

  try {
    const previewFile = await generateTextPreview(writingText);
    return uploadViaApi(previewFile, authHeaders);
  } catch (error) {
    console.error("Failed to generate text preview:", error);
    return null;
  }
};
