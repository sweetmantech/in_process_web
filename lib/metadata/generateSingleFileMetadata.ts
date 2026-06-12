import { uploadVideoToMuxIfNeeded } from './uploadVideoToMuxIfNeeded';
import { uploadFilesToSupabase } from './uploadFilesToSupabase';
import { buildMetadataPayload } from './buildMetadataPayload';
import { resolveContentUri } from './resolveContentUri';
import { MomentMetadata } from '@/types/moment';

export interface SingleFileMetadataParams {
  imageFile: File | null;
  animationFile: File | null;
  previewFile: File | null;
  mimeType: string;
  name: string;
  description: string;
  link: string;
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
  onProgress,
  existingMetadata,
}: SingleFileMetadataParams): Promise<string> => {
  const isVideo = mimeType.includes('video');

  const videoResult = await uploadVideoToMuxIfNeeded(animationFile, mimeType, onProgress);

  const fileUploadResult = await uploadFilesToSupabase(
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
    existingMetadata,
  });

  return metadataResult.uri;
};
