const EXTENSION_MIME: Record<string, string> = {
  mp3: "audio/mpeg",
  wav: "audio/wav",
  m4a: "audio/mp4",
  aac: "audio/aac",
  flac: "audio/flac",
  ogg: "audio/ogg",
  wma: "audio/x-ms-wma",
  pdf: "application/pdf",
  glb: "model/gltf-binary",
  gltf: "model/gltf+json",
  mp4: "video/mp4",
  webm: "video/webm",
  mov: "video/quicktime",
  png: "image/png",
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  gif: "image/gif",
  webp: "image/webp",
  heic: "image/heic",
};

/** Prefer browser File.type; fall back to extension when type is empty. */
export const inferFileMimeType = (file: Pick<File, "type" | "name">): string => {
  if (file.type) return file.type;
  const ext = file.name.split(".").pop()?.toLowerCase() ?? "";
  return EXTENSION_MIME[ext] ?? "";
};
