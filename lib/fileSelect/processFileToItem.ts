import { v4 as uuidv4 } from "uuid";
import { BulkItem } from "@/types/bulk";
import { handleImageSelection } from "./handleImageSelection";
import { handleVideoSelection } from "./handleVideoSelection";
import { handleOtherFileSelection } from "./handleOtherFileSelection";

export const processFileToItem = async (file: File): Promise<BulkItem> => {
  let imageFile: File | null = null;
  let animationFile: File | null = null;
  let previewFile: File | null = null;
  let mimeType = "";

  const mimeHandlers = {
    setMimeType: (m: string) => {
      mimeType = m;
    },
    setImageFile: (f: File | null) => {
      imageFile = f;
    },
    setPreviewFile: (f: File | null) => {
      previewFile = f;
    },
    setAnimationFile: (f: File | null) => {
      animationFile = f;
    },
  };

  const isImage = file.type.includes("image");
  const isVideo = file.type.includes("video");

  if (isVideo) {
    await handleVideoSelection(file, mimeHandlers);
  } else if (isImage) {
    await handleImageSelection(file, mimeHandlers);
  } else {
    await handleOtherFileSelection(file, mimeHandlers);
    if (imageFile) {
      previewFile = imageFile;
      imageFile = null;
    }
  }

  const previewUrl = previewFile
    ? URL.createObjectURL(previewFile)
    : imageFile
      ? URL.createObjectURL(imageFile)
      : "";

  const baseName = file.name.replace(/\.[^/.]+$/, "");

  return {
    id: uuidv4(),
    file,
    previewFile,
    mimeType,
    name: baseName,
    previewUrl,
    status: "idle",
    progress: 0,
  };
};
