import { uploadToSupabase } from "@/lib/supabase/storage/uploadToSupabase";

interface FileUploadResult {
  uploadedPreviewUri: string;
  uploadedImageUri: string;
  uploadedAnimationUri: string;
  image: string;
  animationUrl: string;
}

export const uploadFilesToSupabase = async (
  previewFile: File | null,
  imageFile: File | null,
  animationFile: File | null,
  existingAnimationUrl: string,
  setUploadProgress?: (progress: number) => void,
  mimeType?: string
): Promise<FileUploadResult> => {
  let uploadedPreviewUri = "";
  let uploadedImageUri = "";
  let uploadedAnimationUri = "";
  const animationUrl = existingAnimationUrl;

  const isVideo = mimeType?.includes("video");

  const filesToUpload = [
    { file: previewFile, name: "preview" },
    { file: imageFile, name: "image" },
    ...(isVideo ? [] : [{ file: animationFile, name: "animation" }]),
  ].filter((item) => item.file !== null);

  const totalFiles = filesToUpload.length;
  if (totalFiles === 0) {
    return {
      uploadedPreviewUri: "",
      uploadedImageUri: "",
      uploadedAnimationUri: "",
      image: "",
      animationUrl: existingAnimationUrl,
    };
  }

  for (let i = 0; i < filesToUpload.length; i++) {
    const { file, name } = filesToUpload[i];
    if (!file) continue;

    const fileStartProgress = (i / totalFiles) * 100;
    const fileContribution = 100 / totalFiles;

    setUploadProgress?.(Math.round(fileStartProgress));

    const uploadedUri = await uploadToSupabase(file);

    if (name === "preview") {
      uploadedPreviewUri = uploadedUri;
    } else if (name === "image") {
      uploadedImageUri = uploadedUri;
    } else if (name === "animation") {
      uploadedAnimationUri = uploadedUri;
    }

    setUploadProgress?.(Math.min(Math.round(fileStartProgress + fileContribution), 100));
  }

  return {
    uploadedPreviewUri,
    uploadedImageUri,
    uploadedAnimationUri,
    image: uploadedPreviewUri || "",
    animationUrl: uploadedAnimationUri || uploadedImageUri || animationUrl,
  };
};
