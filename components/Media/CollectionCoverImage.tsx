"use client";

import Image from "next/image";
import { ImagePlus } from "lucide-react";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { useOpenFileDialog } from "@/hooks/useOpenFileDialog";
import { MomentMetadata } from "@/types/moment";

interface CollectionCoverImageProps {
  metadata: MomentMetadata | null;
  isOwner: boolean;
  isSaving: boolean;
}

const CollectionCoverImage = ({ metadata, isOwner, isSaving }: CollectionCoverImageProps) => {
  const { hasMedia, previewFileUrl, fileInputRef } = useMetadataFormProvider();
  const { selectFile } = useMetadataUploadProvider();
  const { openFileDialog } = useOpenFileDialog(fileInputRef, isOwner, isSaving);

  const imageUrl = hasMedia ? previewFileUrl : metadata?.image || undefined;

  return (
    <div
      role="button"
      tabIndex={isOwner ? 0 : -1}
      onClick={openFileDialog}
      onKeyDown={(e) => e.key === "Enter" && openFileDialog()}
      className={`relative size-[132px] shrink-0 overflow-hidden rounded-lg border bg-grey-moss-50 ${
        imageUrl ? "border-grey-moss-100" : "border-dashed border-grey-moss-200"
      } ${isOwner ? "cursor-pointer" : "cursor-default"}`}
    >
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={selectFile}
        disabled={!isOwner || isSaving}
      />
      {imageUrl ? (
        <Image
          src={imageUrl}
          alt={metadata?.name || "cover image"}
          fill
          sizes="132px"
          className="object-cover"
        />
      ) : (
        <div className="flex size-full flex-col items-center justify-center gap-1.5 text-grey-moss-300">
          <ImagePlus className="size-[18px]" strokeWidth={1.5} />
          <span className="font-mono text-[10px]">cover image</span>
        </div>
      )}
    </div>
  );
};

export default CollectionCoverImage;
