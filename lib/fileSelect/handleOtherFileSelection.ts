import { capturePdfPreview } from "./capturePdfPreview";
import { inferFileMimeType } from "./inferFileMimeType";

interface OtherFileSelectionHandlers {
  setMimeType: (mimeType: string) => void;
  setAnimationFile: (file: File | null) => void;
  setPreviewFile: (file: File | null) => void;
}

export const handleOtherFileSelection = async (
  file: File,
  handlers: OtherFileSelectionHandlers
): Promise<void> => {
  // Store blob data - no upload happens here
  handlers.setAnimationFile(file);
  const mimeType = inferFileMimeType(file);
  handlers.setMimeType(mimeType);

  // Generate preview image from PDF first page if PDF
  if (mimeType.includes("pdf")) {
    try {
      const preview: { previewFile: File } = await capturePdfPreview(file);
      handlers.setPreviewFile(preview.previewFile);
    } catch (previewErr: unknown) {
      console.error("Failed to capture PDF preview:", previewErr);
      // Fallback: use PDF file itself (though it won't display as image)
      handlers.setPreviewFile(file);
    }
  }
};
