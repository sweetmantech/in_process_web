import { isModelGltfLike } from "@/lib/media/isModelGltfLike";

interface ContentUriResult {
  contentUri: string;
  mime: string;
}

export const resolveContentUri = (
  mimeType: string,
  animationUrl: string,
  animationFileName: string | null,
  initialMime: string
): ContentUriResult => {
  let contentUri = "";
  let mime = initialMime;

  const isPdf = mimeType.includes("pdf");
  const isImage = mimeType.includes("image");
  const isAudio = mimeType.includes("audio");
  const isModel = isModelGltfLike(mimeType, animationFileName);

  if ((isPdf || isImage || isAudio) && animationUrl) {
    contentUri = animationUrl;
  }

  if (isModel && animationUrl) {
    contentUri = animationUrl;
    if (!mime.trim()) {
      mime = /\.glb$/i.test(animationFileName ?? "") ? "model/gltf-binary" : "model/gltf+json";
    }
  }

  return { contentUri, mime };
};
