"use client";

import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { Fragment } from "react";
import ResetButton from "./ResetButton";
import PreviewContainer from "./PreviewContainer";
import { BulkDropZone } from "@/components/BulkUpload";
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
        className="hidden"
        onChange={selectFile}
        disabled={Boolean(createdTokenId)}
      />
      {selected ? (
        <div className="flex size-full items-center justify-center">
          <div className="relative size-full overflow-hidden md:h-full md:max-h-full md:max-w-full">
            {!createdTokenId && <ResetButton />}
            <PreviewContainer handleImageClick={handleImageClick} />
          </div>
        </div>
      ) : (
        <div className="size-full md:p-0">
          <BulkDropZone onSingleFile={handleSingleFile} />
        </div>
      )}
    </Fragment>
  );
};

export default FileSelect;
