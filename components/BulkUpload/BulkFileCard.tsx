"use client";

import Image from "next/image";
import { BulkItem } from "@/types/bulk";
import { getStatusClass } from "@/lib/bulkUpload/getStatusClass";
import { getMimeTypeIcon } from "@/lib/bulkUpload/getMimeTypeIcon";
import { X } from "lucide-react";

interface BulkFileCardProps {
  item: BulkItem;
  onRemove: (id: string) => void;
  onNameChange: (id: string, name: string) => void;
  isCreating: boolean;
}

const BulkFileCard = ({ item, onRemove, onNameChange, isCreating }: BulkFileCardProps) => {
  return (
    <div className="flex flex-col">
      <div
        className={`relative aspect-square w-full overflow-hidden rounded-xl border-2 shadow-[0_14px_34px_-18px_rgba(27,21,4,0.35),0_0_0_1px_rgba(27,21,4,0.06)] ${getStatusClass(item.status)}`}
      >
        {!isCreating && (
          <button
            type="button"
            onClick={() => onRemove(item.id)}
            className="absolute right-2 top-2 z-10 flex size-[26px] items-center justify-center rounded-full bg-grey-moss-900 text-white shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
            aria-label="Remove"
          >
            <X className="size-3.5" strokeWidth={1.75} />
          </button>
        )}

        <div className="relative size-full overflow-hidden bg-[#EDEAE2]">
          {item.previewUrl ? (
            <Image
              src={item.previewUrl}
              alt={item.name}
              fill
              className="object-cover"
              unoptimized
            />
          ) : (
            <div className="flex size-full items-center justify-center text-2xl text-grey-moss-400">
              {getMimeTypeIcon(item.mimeType)}
            </div>
          )}

          {item.status === "uploading" && (
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50">
              <div className="mb-1.5 h-1.5 w-3/4 overflow-hidden rounded-full bg-grey-moss-300">
                <div
                  className="h-full bg-white transition-all duration-300"
                  style={{ width: `${item.progress}%` }}
                />
              </div>
              <span className="font-archivo text-xs text-white">{item.progress}%</span>
            </div>
          )}

          {item.status === "done" && (
            <div className="absolute inset-0 flex items-center justify-center bg-green-500/20">
              <span className="text-2xl">✓</span>
            </div>
          )}

          {item.status === "error" && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-500/20">
              <span className="font-archivo text-xs text-red-600">{item.error || "Error"}</span>
            </div>
          )}
        </div>
      </div>

      <input
        type="text"
        value={item.name}
        onChange={(e) => onNameChange(item.id, e.target.value)}
        disabled={isCreating}
        placeholder="name"
        className="mt-2 w-full bg-transparent font-archivo text-[12.5px] text-[#6B6456] outline-none placeholder-[#B4AEA2] disabled:opacity-60"
      />
    </div>
  );
};

export default BulkFileCard;
