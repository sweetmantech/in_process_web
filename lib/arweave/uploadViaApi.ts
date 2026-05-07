import { IN_PROCESS_API } from "@/lib/consts";
import { uploadToBlob } from "@/lib/blob/uploadToBlob";

export type UploadResult = {
  arweave_uri: string;
};

export const uploadViaApi = async (file: File, authHeaders: HeadersInit): Promise<UploadResult> => {
  const blobUrl = await uploadToBlob(file, authHeaders);

  const response = await fetch(`${IN_PROCESS_API}/upload`, {
    method: "POST",
    headers: { "Content-Type": "application/json", ...authHeaders },
    body: JSON.stringify({ url: blobUrl }),
  });

  if (!response.ok) {
    throw new Error(`Upload failed: ${response.statusText}`);
  }

  const { uri } = await response.json();
  console.log("🌐 Final Arweave URI Received:", uri);
  return { arweave_uri: uri };
};
