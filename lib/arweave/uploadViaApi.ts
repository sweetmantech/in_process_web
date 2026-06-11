import { IN_PROCESS_API } from "@/lib/consts";
import { uploadToBlob } from "@/lib/blob/uploadToBlob";
import type { UploadClient } from "@/types/upload";

export type UploadResult = {
  arweave_uri: string;
};

export const uploadViaApi = async (file: File, client: UploadClient): Promise<UploadResult> => {
  const blobUrl = await uploadToBlob(file, client);

  const uploadToken = await client.recaptcha();
  const uploadHeaders = {
    "Content-Type": "application/json",
    ...(client.headers as Record<string, string>),
    ...(uploadToken && { "X-Recaptcha-Token": uploadToken }),
  };
  const response = await fetch(`${IN_PROCESS_API}/upload`, {
    method: "POST",
    headers: uploadHeaders,
    body: JSON.stringify({ url: blobUrl }),
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const { uri } = await response.json();
  console.log("🌐 Final Arweave URI Received:", uri);
  return { arweave_uri: uri };
};
