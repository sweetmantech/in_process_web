"use client";

import Image from "next/image";
import { BulkItem } from "@/types/bulk";

interface BulkFileCardProps {
  item: BulkItem;
  onRemove: (id: string) => void;
  onNameChange: (id: string, name: string) => void;
  isCreating: boolean;
}

const statusColor: Record<BulkItem["status"], string> = {
  idle: "border-grey-moss-300",
  uploading: "border-blue-400",
  done: "border-green-400",
  error: "border-red-400",
};

const BulkFileCard = ({ item, onRemove, onNameChange, isCreating }: BulkFileCardProps) => {
  return (
    <div
      className={`relative flex flex-col overflow-hidden rounded-lg border-2 bg-grey-moss-100 transition-colors ${statusColor[item.status]}`}
    >
      {!isCreating && (
        <button
          type="button"
          onClick={() => onRemove(item.id)}
          className="absolute right-1.5 top-1.5 z-10 flex size-5 items-center justify-center rounded-full bg-grey-moss-900 text-white hover:bg-red-500"
          aria-label="Remove"
        >
          ×
        </button>
      )}

      <div className="relative aspect-square w-full overflow-hidden bg-grey-moss-200">
        {item.previewUrl ? (
          <Image src={item.previewUrl} alt={item.name} fill className="object-cover" unoptimized />
        ) : (
          <div className="flex size-full items-center justify-center text-2xl text-grey-moss-400">
            {item.mimeType.includes("pdf") ? "PDF" : item.mimeType.includes("audio") ? "♪" : "?"}
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

      <input
        type="text"
        value={item.name}
        onChange={(e) => onNameChange(item.id, e.target.value)}
        disabled={isCreating}
        placeholder="name"
        className="w-full border-t border-grey-moss-300 bg-transparent px-2 py-1.5 font-archivo text-xs text-grey-moss-900 placeholder-grey-moss-400 outline-none focus:bg-white disabled:opacity-60"
      />
    </div>
  );
};

export default BulkFileCard;
