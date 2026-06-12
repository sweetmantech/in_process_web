import { uploadVideoToMux } from "@/lib/mux/uploadVideoToMux";

interface VideoUploadResult {
  animationUrl: string;
  contentUri: string;
}

export const uploadVideoToMuxIfNeeded = async (
  animationFile: File | null,
  mimeType: string,
  onProgress?: (progress: number) => void
): Promise<VideoUploadResult> => {
  if (!animationFile || !mimeType.includes("video")) {
    return { animationUrl: "", contentUri: "" };
  }

  const muxResult = await uploadVideoToMux(animationFile, onProgress);
  return {
    animationUrl: muxResult.playbackUrl,
    contentUri: muxResult.downloadUrl,
  };
};
