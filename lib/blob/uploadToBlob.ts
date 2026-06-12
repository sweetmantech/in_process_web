import { upload } from "@vercel/blob/client";
import { IN_PROCESS_API } from "@/lib/consts";
import { v4 as uuidv4 } from "uuid";
import type { UploadClient } from "@/types/upload";

export const uploadToBlob = async (file: File, client: UploadClient): Promise<string> => {
  const ext = file.name.split(".").pop();
  // Use uuid v4 with explicit options to bypass native crypto.randomUUID(),
  // which throws DOMException in Firefox on non-secure (HTTP) contexts.
  const id = uuidv4({});
  const pathname = ext ? `${id}.${ext}` : id;
  const recaptchaToken = await client.recaptcha();
  const headers = {
    ...(client.headers as Record<string, string>),
    ...(recaptchaToken && { "X-Recaptcha-Token": recaptchaToken }),
  };
  const { url } = await upload(pathname, file, {
    access: "private",
    handleUploadUrl: `${IN_PROCESS_API}/blob`,
    headers,
  });
  console.log("🗂️ Temporary Blob URL Received:", url);
  return url;
};
