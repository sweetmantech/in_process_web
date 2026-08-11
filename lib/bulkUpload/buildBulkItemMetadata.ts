import { MomentMetadata } from "@/types/moment";
import { isModelGltfLike } from "@/lib/media/isModelGltfLike";
import { isModelGltfMime } from "@/lib/media/isModelGltfMime";
import { inferFileMimeType } from "@/lib/fileSelect/inferFileMimeType";

export type BulkMediaSource = {
  name: string;
  mimeType: string;
  previewUrl: string;
  fileName?: string;
};

/** Build feed-compatible metadata so ContentRenderer can preview local bulk files. */
export const buildBulkItemMetadata = (item: BulkMediaSource, fileUrl: string): MomentMetadata => {
  let mime =
    item.mimeType || (item.fileName ? inferFileMimeType({ type: "", name: item.fileName }) : "");

  if (isModelGltfLike(mime, item.fileName) && !isModelGltfMime(mime)) {
    mime = item.fileName?.toLowerCase().endsWith(".gltf") ? "model/gltf+json" : "model/gltf-binary";
  }

  const isImage = mime.includes("image");

  return {
    name: item.name,
    description: "",
    image: item.previewUrl || (isImage ? fileUrl : ""),
    animation_url: isImage ? undefined : fileUrl,
    content: {
      mime,
      uri: fileUrl,
    },
  };
};
