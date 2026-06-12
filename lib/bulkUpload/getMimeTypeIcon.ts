export const getMimeTypeIcon = (mimeType: string): string => {
  if (mimeType.includes("pdf")) return "PDF";
  if (mimeType.includes("audio")) return "♪";
  return "?";
};
