import { IN_PROCESS_API } from "@/lib/consts";

export const finalizeHereNowUpload = async (
  slug: string,
  versionId: string,
  filePath: string,
  headers: Record<string, string>
): Promise<string> => {
  const res = await fetch(`${IN_PROCESS_API}/herenow`, {
    method: "PUT",
    headers,
    body: JSON.stringify({ slug, versionId, filePath }),
  });
  if (!res.ok) throw new Error(`Failed to finalize upload: ${res.statusText}`);
  const { url } = await res.json();
  return url;
};
