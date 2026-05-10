import { computeSHA256 } from "./computeSHA256";
import { initHereNowUpload } from "./initHereNowUpload";
import { putHereNowFile } from "./putHereNowFile";
import { finalizeHereNowUpload } from "./finalizeHereNowUpload";

export const uploadToHereNow = async (file: File, authHeaders: HeadersInit): Promise<string> => {
  const ext = file.name.split(".").pop();
  const fileName = ext ? `${crypto.randomUUID()}.${ext}` : crypto.randomUUID();
  const hash = await computeSHA256(file);

  const headers = {
    "Content-Type": "application/json",
    ...(authHeaders as Record<string, string>),
  };

  const { uploadUrl, uploadHeaders, slug, versionId, filePath } = await initHereNowUpload(
    fileName,
    file.size,
    file.type,
    hash,
    headers
  );

  await putHereNowFile(uploadUrl, uploadHeaders, file);

  return finalizeHereNowUpload(slug, versionId, filePath, headers);
};
