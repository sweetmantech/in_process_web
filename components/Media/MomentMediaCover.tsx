"use client";

import Image from "next/image";
import { FilePlus2, Pencil } from "lucide-react";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { useMomentEditProvider } from "@/providers/MomentEditProvider";
import { useOpenFileDialog } from "@/hooks/useOpenFileDialog";
import { determineMediaType } from "@/lib/zora/utils";
import { MomentMetadata } from "@/types/moment";
import Preview from "@/components/MomentsGrid/Preview";

interface MomentMediaCoverProps {
  metadata: MomentMetadata | null;
  isOwner: boolean;
  isSaving: boolean;
}

const kindFromMime = (mime: string | undefined) => {
  if (!mime) return null;
  const kind = determineMediaType(mime);
  return kind === "unknown" ? "file" : kind;
};

const MomentMediaCover = ({ metadata, isOwner, isSaving }: MomentMediaCoverProps) => {
  const { hasMedia, previewFileUrl, mimeType, fileInputRef } = useMetadataFormProvider();
  const { selectFile } = useMetadataUploadProvider();
  const { enterEditMode } = useMomentEditProvider();
  const { openFileDialog } = useOpenFileDialog(fileInputRef, isOwner, isSaving);

  const imageUrl = hasMedia ? previewFileUrl : metadata?.image || undefined;
  const typeLabel = kindFromMime(hasMedia ? mimeType : metadata?.content?.mime);
  const canEdit = isOwner && !isSaving;
  const hasContent = Boolean(imageUrl || metadata || hasMedia);

  const handleClick = () => {
    if (!canEdit) return;
    enterEditMode();
    openFileDialog();
  };

  return (
    <div className="relative size-[132px] shrink-0">
      <div
        role="button"
        tabIndex={canEdit ? 0 : -1}
        onClick={handleClick}
        onKeyDown={(e) => e.key === "Enter" && handleClick()}
        className={`relative size-full overflow-hidden rounded-lg border bg-grey-moss-50 ${
          hasContent ? "border-grey-moss-100" : "border-dashed border-grey-moss-200"
        } ${canEdit ? "cursor-pointer" : "cursor-default"}`}
      >
        <input
          ref={fileInputRef}
          type="file"
          className="hidden"
          onChange={selectFile}
          disabled={!canEdit}
        />

        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={metadata?.name || "moment media"}
            fill
            sizes="132px"
            className="object-cover"
          />
        ) : hasMedia && typeLabel ? (
          <div className="flex size-full flex-col items-center justify-center gap-1 bg-grey-moss-50">
            <span className="rounded-full bg-white px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-grey-moss-500 ring-1 ring-grey-moss-100">
              {typeLabel}
            </span>
          </div>
        ) : metadata ? (
          <Preview data={metadata} />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-1.5 text-grey-moss-300">
            <FilePlus2 className="size-[18px]" strokeWidth={1.5} />
            <span className="font-mono text-[10px]">media</span>
          </div>
        )}

        {typeLabel && imageUrl && (
          <span className="absolute left-1.5 top-1.5 rounded-full bg-white/90 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wider text-grey-moss-500">
            {typeLabel}
          </span>
        )}
      </div>

      {canEdit && hasContent && (
        <span
          aria-hidden="true"
          className="absolute -bottom-1.5 -right-1.5 flex h-[18px] w-[18px] items-center justify-center rounded-full border border-tan-secondary bg-tan-primary text-grey-moss-900"
        >
          <Pencil className="h-2.5 w-2.5" />
        </span>
      )}
    </div>
  );
};

export default MomentMediaCover;
