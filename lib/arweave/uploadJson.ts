import { uploadViaApi, type UploadResult } from "./uploadViaApi";
import type { UploadClient } from "@/types/upload";

export async function uploadJson(json: object, client: UploadClient): Promise<UploadResult> {
  const jsonString = JSON.stringify(json);
  const file = new File([jsonString], "upload.json", { type: "application/json" });
  return uploadViaApi(file, client);
}
