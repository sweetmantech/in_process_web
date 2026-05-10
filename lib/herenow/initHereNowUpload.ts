import { IN_PROCESS_API } from "@/lib/consts";

export const initHereNowUpload = async (
  fileName: string,
  fileSize: number,
  contentType: string,
  hash: string,
  headers: Record<string, string>
): Promise<{
  uploadUrl: string;
  uploadHeaders: Record<string, string>;
  slug: string;
  versionId: string;
  filePath: string;
}> => {
  const res = await fetch(`${IN_PROCESS_API}/herenow`, {
    method: "POST",
    headers,
    body: JSON.stringify({ fileName, fileSize, contentType, hash }),
  });
  if (!res.ok) throw new Error(`Failed to initialize upload: ${res.statusText}`);
  return res.json();
};
