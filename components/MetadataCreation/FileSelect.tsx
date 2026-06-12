"use client";

import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { Fragment } from "react";
import NoFileSelected from "./NoFileSelected";
import ResetButton from "./ResetButton";
import PreviewContainer from "./PreviewContainer";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useFileSelect from "@/hooks/useFileSelect";

const FileSelect = () => {
  const { selectFile } = useMetadataUploadProvider();
  const { createdTokenId } = useMomentCreateProvider();
  const { previewFile, animationFile, imageFile, fileInputRef } = useMetadataFormProvider();
  const { handleSingleFile } = useFileSelect();
  const selected = previewFile || animationFile || imageFile;
  const handleImageClick = () => fileInputRef.current?.click();

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
