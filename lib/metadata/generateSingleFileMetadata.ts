import { uploadVideoToMuxIfNeeded } from "./uploadVideoToMuxIfNeeded";
import { uploadFilesToArweave } from "./uploadFilesToArweave";
import { buildMetadataPayload } from "./buildMetadataPayload";
import { resolveContentUri } from "./resolveContentUri";
import type { UploadClient } from "@/types/upload";
import { MomentMetadata } from "@/types/moment";

export interface SingleFileMetadataParams {
  imageFile: File | null;
  animationFile: File | null;
  previewFile: File | null;
  mimeType: string;
  name: string;
  description: string;
  link: string;
  client: UploadClient;
  onProgress?: (progress: number) => void;
  existingMetadata?: MomentMetadata | null;
}

export const generateSingleFileMetadata = async ({
  imageFile,
  animationFile,
  previewFile,
  mimeType,
  name,
  description,
  link,
  client,
  onProgress,
  existingMetadata,
}: SingleFileMetadataParams): Promise<string> => {
  const isVideo = mimeType.includes("video");

  const videoResult = await uploadVideoToMuxIfNeeded(
    animationFile,
    mimeType,
    client.headers,
    onProgress
  );

  const fileUploadResult = await uploadFilesToArweave(
    client,
    previewFile,
    imageFile,
    animationFile,
    videoResult.animationUrl,
    onProgress,
    mimeType
  );

  const animation_url = isVideo
    ? videoResult.animationUrl
    : fileUploadResult.animationUrl || videoResult.animationUrl;

  const { contentUri, mime } = isVideo
    ? { contentUri: videoResult.contentUri, mime: mimeType }
    : resolveContentUri(mimeType, animation_url, animationFile?.name ?? null, mimeType);

  const metadataResult = await buildMetadataPayload({
    name,
    description,
    externalUrl: link,
    image: fileUploadResult.image,
    animationUrl: animation_url,
    mime,
    contentUri,
    client,
    existingMetadata,
  });

  return metadataResult.arweave_uri;
};
