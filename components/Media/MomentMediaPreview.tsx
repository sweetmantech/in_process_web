"use client";

import { FilePlus2, Pencil } from "lucide-react";
import ContentRenderer from "@/components/Renderers";
import MediaUploaded from "@/components/MetadataCreation/MediaUploaded";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { useMomentEditProvider } from "@/providers/MomentEditProvider";
import { useOpenFileDialog } from "@/hooks/useOpenFileDialog";
import { determineMediaType } from "@/lib/zora/utils";
import { MomentMetadata } from "@/types/moment";

interface MomentMediaPreviewProps {
  metadata: MomentMetadata | null;
  isOwner: boolean;
  isSaving: boolean;
}

const kindFromMime = (mime: string | undefined) => {
  if (!mime) return null;
  const kind = determineMediaType(mime);
  return kind === "unknown" ? "file" : kind;
};

const MomentMediaPreview = ({ metadata, isOwner, isSaving }: MomentMediaPreviewProps) => {
  const { hasMedia, mimeType, fileInputRef } = useMetadataFormProvider();
  const { selectFile } = useMetadataUploadProvider();
  const { editActive, enterEditMode } = useMomentEditProvider();
  const { openFileDialog } = useOpenFileDialog(fileInputRef, isOwner, isSaving);

  const canEdit = isOwner && !isSaving;
  const showUploader = editActive || !metadata;
  const typeLabel = kindFromMime(hasMedia ? mimeType : metadata?.content?.mime);

  const handleReplace = () => {
    if (!canEdit) return;
    enterEditMode();
    openFileDialog();
  };

  return (
    <div className="flex h-full min-h-[260px] flex-col gap-1.5 md:min-h-0">
      <div className="flex items-center justify-between gap-2">
        <span className="font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300">
          preview
        </span>
        {typeLabel && (
          <span className="rounded-full bg-grey-moss-50 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-grey-moss-400">
            {typeLabel}
          </span>
        )}
      </div>

      <div className="relative min-h-[240px] flex-1 overflow-hidden rounded-lg border border-grey-moss-100 bg-[url('/grid.svg')] bg-contain md:min-h-[280px]">
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={selectFile}
          disabled={!canEdit}
        />

        {showUploader ? (
          hasMedia ? (
            <div className="absolute inset-0">
              <MediaUploaded handleImageClick={openFileDialog} />
            </div>
          ) : (
            <button
              type="button"
              onClick={canEdit ? openFileDialog : undefined}
              disabled={!canEdit}
              className={`absolute inset-0 flex flex-col items-center justify-center gap-2 px-4 ${
                canEdit
                  ? "cursor-pointer text-grey-moss-300 transition-colors hover:bg-grey-moss-50/60"
                  : "cursor-default text-grey-moss-200"
              }`}
            >
              <span className="flex size-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-grey-moss-100">
                <FilePlus2 className="size-4" strokeWidth={1.5} />
              </span>
              <span className="font-archivo-medium text-xs">
                {canEdit ? "Choose media" : "No media"}
              </span>
              {canEdit && (
                <span className="text-center font-mono text-[9px] uppercase tracking-wide text-grey-moss-200">
                  image · video · pdf · audio
                </span>
              )}
            </button>
          )
        ) : (
          metadata && (
            <div className="absolute inset-0">
              <ContentRenderer metadata={metadata} />
            </div>
          )
        )}

        {canEdit && (metadata || hasMedia) && (
          <button
            type="button"
            onClick={handleReplace}
            aria-label="Replace media"
            className="absolute bottom-2.5 right-2.5 z-10 flex h-7 w-7 items-center justify-center rounded-full border border-tan-secondary bg-tan-primary text-grey-moss-900 shadow-sm transition-colors hover:bg-tan"
          >
            <Pencil className="h-3 w-3" />
          </button>
        )}
      </div>
    </div>
  );
};

export default MomentMediaPreview;
