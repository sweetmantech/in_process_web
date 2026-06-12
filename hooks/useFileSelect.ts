import { useCallback } from "react";
import { validateFile } from "@/lib/fileSelect/validateFile";
import { handleVideoSelection } from "@/lib/fileSelect/handleVideoSelection";
import { handleImageSelection } from "@/lib/fileSelect/handleImageSelection";
import { handleOtherFileSelection } from "@/lib/fileSelect/handleOtherFileSelection";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const useFileSelect = () => {
  const { setMimeType, setImageFile, setPreviewFile, setAnimationFile, imageFile } =
    useMetadataFormProvider();

  const handleSingleFile = useCallback(
    async (file: File) => {
      try {
        if (!validateFile(file)) return;
        const mimeType = file.type;
        const isImage = mimeType.includes("image");
        const isVideo = mimeType.includes("video");

        if (isVideo) {
          await handleVideoSelection(file, { setAnimationFile, setMimeType, setPreviewFile });
        } else if (isImage) {
          await handleImageSelection(file, { setMimeType, setImageFile, setPreviewFile });
        } else {
          await handleOtherFileSelection(file, { setMimeType, setAnimationFile, setPreviewFile });
          if (imageFile) {
            setPreviewFile(imageFile);
            setImageFile(null);
          }
        }
      } catch {
        // validateFile already shows toast
      }
    },
    [setMimeType, setImageFile, setPreviewFile, setAnimationFile, imageFile]
  );

  const selectFile = useCallback(
    async (event: any) => {
      const file: File = event.target.files[0];
      if (file) await handleSingleFile(file);
    },
    [handleSingleFile]
  );

  return { selectFile, handleSingleFile };
};

export default useFileSelect;
