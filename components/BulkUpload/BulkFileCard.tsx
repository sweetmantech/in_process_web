"use client";

import Image from "next/image";
import { X } from "lucide-react";
import { BulkItem } from "@/types/bulk";
import { getMimeTypeIcon } from "@/lib/bulkUpload/getMimeTypeIcon";
import { cn } from "@/lib/utils";
import BulkDiscThumb from "./BulkDiscThumb";

interface BulkFileCardProps {
  item: BulkItem;
  selected: boolean;
  isCreating?: boolean;
  onSelect: () => void;
  onRemove: () => void;
}

const BulkFileCard = ({
  item,
  selected,
  isCreating = false,
  onSelect,
  onRemove,
}: BulkFileCardProps) => {
  const isAudio = item.mimeType.includes("audio");
  const hasImagePreview =
    Boolean(item.previewUrl) && (!isAudio || item.previewUrl !== item.fileUrl);

  return (
    <div
      className={cn(
        "relative w-[78px] overflow-hidden rounded-[11px] border-2 bg-white transition-colors",
        selected
          ? "border-grey-moss-900 shadow-[0_8px_22px_-10px_rgba(27,21,4,.4)]"
          : "border-[#E4E0D7]"
      )}
    >
      {!isCreating && selected && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onRemove();
          }}
          className="absolute right-1 top-1 z-10 flex size-[18px] items-center justify-center rounded-full bg-grey-moss-900 text-white shadow-[0_2px_6px_rgba(0,0,0,0.35)]"
          aria-label="Remove"
        >
          <X className="size-2.5" strokeWidth={2} />
        </button>
      )}

      <button
        type="button"
        onClick={onSelect}
        className={cn(
          "relative flex aspect-square w-full items-center justify-center p-0",
          isAudio && !hasImagePreview ? "bg-neutral-900" : "bg-[#EDEAE2]"
        )}
      >
        {hasImagePreview ? (
          <Image src={item.previewUrl} alt={item.name} fill className="object-cover" unoptimized />
        ) : isAudio ? (
          <BulkDiscThumb />
        ) : (
          <div className="flex size-full items-center justify-center text-sm text-grey-moss-400">
            {getMimeTypeIcon(item.mimeType)}
          </div>
        )}

        {item.status === "uploading" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/45">
            <span className="font-archivo text-[10px] text-white">
              {Math.round(item.progress)}%
            </span>
          </div>
        )}

        {item.status === "done" && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/35">
            <div className="flex size-7 items-center justify-center rounded-full bg-white/95 shadow-sm">
              <span className="text-[16px] leading-none text-grey-moss-900">✓</span>
            </div>
          </div>
        )}

        {item.status === "error" && <div className="absolute inset-0 bg-red-500/20" />}
      </button>
    </div>
  );
};

export default BulkFileCard;
