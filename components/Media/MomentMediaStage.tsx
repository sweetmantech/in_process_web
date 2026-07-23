"use client";

import { useCallback, type MouseEvent, type ReactNode } from "react";
import Image from "next/image";
import { FilePlus2, Pencil, Trash2 } from "lucide-react";
import ContentRenderer from "@/components/Renderers";
import MediaUploaded from "@/components/MetadataCreation/MediaUploaded";
import { useOpenFileDialog } from "@/hooks/useOpenFileDialog";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMomentEditProvider } from "@/providers/MomentEditProvider";
import { determineMediaType } from "@/lib/zora/utils";
import { MomentMetadata } from "@/types/moment";

const TYPE_CHIPS = ["image", "video", "pdf", "audio"] as const;
const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";

interface MomentMediaStageProps {
  metadata: MomentMetadata | null;
  isOwner: boolean;
  isSaving: boolean;
  fields: ReactNode;
}

const mediaKindLabel = (mime: string | undefined) => {
  if (!mime) return null;
  const kind = determineMediaType(mime);
  return kind === "unknown" ? "file" : kind;
};

const needsRichPreview = (mime: string | undefined) => {
  if (!mime) return true;
  return determineMediaType(mime) !== "image";
};

const MomentMediaStage = ({ metadata, isOwner, isSaving, fields }: MomentMediaStageProps) => {
  const { selectFile } = useMetadataUploadProvider();
  const { hasMedia, previewFileUrl, mimeType, fileInputRef, resetFiles } =
    useMetadataFormProvider();
  const { editActive, enterEditMode } = useMomentEditProvider();
  const { openFileDialog } = useOpenFileDialog(fileInputRef, isOwner, isSaving);

  const showUploader = editActive || !metadata;
  const activeMime = showUploader && hasMedia ? mimeType : metadata?.content?.mime;
  const typeLabel = mediaKindLabel(activeMime || undefined);
  const imageUrl = hasMedia ? previewFileUrl : metadata?.image || undefined;
  const canOpenPicker = isOwner && !isSaving;
  const hasFile = Boolean(imageUrl || (showUploader ? hasMedia : metadata));
  const showPreview =
    (showUploader && hasMedia && needsRichPreview(mimeType)) ||
    (!showUploader && Boolean(metadata) && needsRichPreview(metadata?.content?.mime));

  const handleTileClick = useCallback(() => {
    if (!canOpenPicker) return;
    if (!showUploader && metadata) enterEditMode();
    openFileDialog();
  }, [canOpenPicker, showUploader, metadata, enterEditMode, openFileDialog]);

  const handleClear = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (!canOpenPicker) return;
    resetFiles();
    enterEditMode();
  };

  return (
    <div className="flex flex-col gap-5">
      <div className="flex flex-col items-start gap-5 md:flex-row">
        <div className="flex flex-col gap-1">
          <span className={FIELD_LABEL_CLASS}>file</span>
          <div className="relative size-[148px] shrink-0">
            <button
              type="button"
              onClick={handleTileClick}
              disabled={!canOpenPicker}
              className={`group relative size-full overflow-hidden rounded-2xl border bg-grey-moss-50 text-left transition-colors ${
                hasFile
                  ? "border-grey-moss-100"
                  : "border-dashed border-grey-moss-200 hover:border-tan hover:bg-tan/10"
              } ${canOpenPicker ? "cursor-pointer" : "cursor-default"}`}
            >
              <input
                ref={fileInputRef}
                id="media"
                type="file"
                className="hidden"
                onChange={selectFile}
                disabled={!canOpenPicker}
              />

              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt={metadata?.name || "moment media"}
                  fill
                  sizes="148px"
                  className="object-cover transition-transform duration-300 group-hover:scale-[1.03]"
                />
              ) : hasFile && typeLabel ? (
                <div className="flex size-full flex-col items-center justify-center gap-1.5 bg-gradient-to-br from-grey-moss-50 to-tan/20">
                  <span className="rounded-full bg-white px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-grey-moss-500 shadow-sm ring-1 ring-grey-moss-100">
                    {typeLabel}
                  </span>
                  <span className="font-archivo text-[10px] text-grey-moss-300">
                    tap to replace
                  </span>
                </div>
              ) : (
                <div className="flex size-full flex-col items-center justify-center gap-2 px-3">
                  <span className="flex size-10 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-grey-moss-100">
                    <FilePlus2 className="size-4 text-grey-moss-400" strokeWidth={1.5} />
                  </span>
                  <span className="font-archivo-medium text-[11px] text-grey-moss-400">
                    add media
                  </span>
                  <div className="flex flex-wrap justify-center gap-1">
                    {TYPE_CHIPS.map((chip) => (
                      <span
                        key={chip}
                        className="rounded-full bg-white/80 px-1.5 py-0.5 font-mono text-[8px] uppercase tracking-wide text-grey-moss-300 ring-1 ring-grey-moss-100"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {typeLabel && imageUrl && (
                <span className="absolute left-2 top-2 rounded-full bg-white/90 px-2 py-0.5 font-mono text-[9px] uppercase tracking-wider text-grey-moss-500 shadow-sm">
                  {typeLabel}
                </span>
              )}
            </button>

            {canOpenPicker && hasFile && (
              <span className="absolute -bottom-1.5 -right-1.5 flex gap-1">
                {(hasMedia || editActive) && (
                  <button
                    type="button"
                    onClick={handleClear}
                    aria-label="Clear media"
                    className="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-grey-moss-100 bg-white text-grey-moss-400 transition-colors hover:border-grey-moss-300 hover:text-grey-moss-900"
                  >
                    <Trash2 className="h-2.5 w-2.5" />
                  </button>
                )}
                <span
                  aria-hidden="true"
                  className="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-tan-secondary bg-tan-primary text-grey-moss-900"
                >
                  <Pencil className="h-2.5 w-2.5" />
                </span>
              </span>
            )}
          </div>
        </div>

        <div className="flex w-full min-w-0 flex-1 flex-col gap-3.5">{fields}</div>
      </div>

      {showPreview && (
        <div className="relative max-h-[280px] min-h-[200px] w-full overflow-hidden rounded-2xl border border-grey-moss-100 bg-[url('/grid.svg')] bg-contain">
          {showUploader && hasMedia ? (
            <div className="absolute inset-0">
              <MediaUploaded handleImageClick={openFileDialog} />
            </div>
          ) : (
            metadata && (
              <div className="absolute inset-0">
                <ContentRenderer metadata={metadata} />
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default MomentMediaStage;
