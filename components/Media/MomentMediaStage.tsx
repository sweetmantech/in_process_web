"use client";

import NoFileSelected from "@/components/MetadataCreation/NoFileSelected";
import MediaUploaded from "@/components/MetadataCreation/MediaUploaded";
import ResetButton from "@/components/MetadataCreation/ResetButton";
import ContentRenderer from "@/components/Renderers";
import { useOpenFileDialog } from "@/hooks/useOpenFileDialog";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMomentEditProvider } from "@/providers/MomentEditProvider";
import { MomentMetadata } from "@/types/moment";

interface MomentMediaStageProps {
  metadata: MomentMetadata | null;
  isOwner: boolean;
  isSaving: boolean;
}

const MomentMediaStage = ({ metadata, isOwner, isSaving }: MomentMediaStageProps) => {
  const { selectFile } = useMetadataUploadProvider();
  const { hasMedia, fileInputRef } = useMetadataFormProvider();
  const { editActive, enterEditMode } = useMomentEditProvider();
  const { openFileDialog } = useOpenFileDialog(fileInputRef, isOwner, isSaving);

  const showUploader = editActive || !metadata;

  return (
    <div className="relative aspect-[571/692] min-h-[280px] overflow-hidden rounded-lg border border-grey-moss-100 bg-[url('/grid.svg')] bg-contain md:min-h-[360px]">
      {showUploader ? (
        <>
          <input
            ref={fileInputRef}
            id="media"
            type="file"
            className={`cursor-pointer ${hasMedia ? "hidden" : "z-2 absolute size-full opacity-0"}`}
            onChange={selectFile}
            disabled={!isOwner || isSaving}
          />
          {hasMedia ? (
            <>
              {isOwner && !isSaving && <ResetButton />}
              <MediaUploaded handleImageClick={openFileDialog} />
            </>
          ) : (
            <NoFileSelected />
          )}
        </>
      ) : (
        <>
          <ContentRenderer metadata={metadata} />
          {isOwner && !isSaving && <ResetButton onReset={enterEditMode} />}
        </>
      )}
    </div>
  );
};

export default MomentMediaStage;
