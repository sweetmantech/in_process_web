export const putHereNowFile = async (
  uploadUrl: string,
  uploadHeaders: Record<string, string>,
  file: File
): Promise<void> => {
  const res = await fetch(uploadUrl, {
    method: "PUT",
    headers: { ...uploadHeaders, "Content-Type": file.type },
    body: file,
  });
  if (!res.ok) throw new Error(`Failed to upload file: ${res.statusText}`);
};
