import { uploadViaApi, type UploadResult } from "@/lib/arweave/uploadViaApi";
import { generateTextPreview } from "./generateTextPreview";
import type { UploadClient } from "@/types/upload";

export const generateAndUploadPreview = async (
  writingText: string,
  client: UploadClient
): Promise<UploadResult | null> => {
  if (!writingText.trim()) return null;

  try {
    const previewFile = await generateTextPreview(writingText);
    return uploadViaApi(previewFile, client);
  } catch (error) {
    console.error("Failed to generate text preview:", error);
    return null;
  }
};
