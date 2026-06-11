"use client";

import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { Fragment, useCallback } from "react";
import NoFileSelected from "./NoFileSelected";
import ResetButton from "./ResetButton";
import PreviewContainer from "./PreviewContainer";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { validateFile } from "@/lib/fileSelect/validateFile";
import { handleVideoSelection } from "@/lib/fileSelect/handleVideoSelection";
import { handleImageSelection } from "@/lib/fileSelect/handleImageSelection";
import { handleOtherFileSelection } from "@/lib/fileSelect/handleOtherFileSelection";

const FileSelect = () => {
  const { selectFile } = useMetadataUploadProvider();
  const { createdTokenId } = useMomentCreateProvider();
  const {
    previewFile,
    animationFile,
    imageFile,
    fileInputRef,
    setMimeType,
    setImageFile,
    setPreviewFile,
    setAnimationFile,
  } = useMetadataFormProvider();
  const selected = previewFile || animationFile || imageFile;
  const handleImageClick = () => fileInputRef.current?.click();

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
          await handleOtherFileSelection(file, {
            setMimeType,
            setAnimationFile,
            setPreviewFile,
          });
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

  return (
    <Fragment>
      <input
        ref={fileInputRef}
        id="media"
        type="file"
        className={`cursor-pointer ${selected ? "hidden" : "z-2 absolute size-full opacity-0 pointer-events-none"}`}
        onChange={selectFile}
        disabled={Boolean(createdTokenId)}
      />
      {selected ? (
        <>
          {!createdTokenId && <ResetButton />}
          <PreviewContainer handleImageClick={handleImageClick} />
        </>
      ) : (
        <NoFileSelected onSingleFile={handleSingleFile} />
      )}
    </Fragment>
  );
};

export default FileSelect;
