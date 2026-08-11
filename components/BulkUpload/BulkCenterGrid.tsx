"use client";

import { X } from "lucide-react";
import useBulkCenterGrid from "@/hooks/useBulkCenterGrid";
import BulkMediaPreview from "./BulkMediaPreview";
import BulkThumbSwiper from "./BulkThumbSwiper";

const BulkCenterGrid = () => {
  const {
    bulkItems,
    setItemName,
    isCreating,
    inputRef,
    onChange,
    selectedIndex,
    setSelectedIndex,
    selectedItem,
    handleRemoveSelected,
    handleRemoveAt,
  } = useBulkCenterGrid();

  if (!selectedItem) return null;

  return (
    <div className="relative flex min-h-0 w-full flex-1 flex-col overflow-hidden">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,audio/*,.glb,.gltf"
        className="hidden"
        onChange={onChange}
      />

      <div className="mx-auto flex min-h-0 w-full max-w-[720px] flex-1 flex-col">
        <div className="relative min-h-0 w-full flex-1 [container-type:size]">
          <div className="absolute left-1/2 top-1/2 size-[min(100cqmin,720px)] max-h-full max-w-full -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-[16px] border border-[#E4E0D7] bg-white shadow-[0_30px_70px_-34px_rgba(27,21,4,.45),0_0_0_1px_rgba(27,21,4,.03)]">
            <div className="relative size-full bg-[#EDEAE2]">
              {!isCreating && (
                <button
                  type="button"
                  onClick={handleRemoveSelected}
                  className="absolute right-3 top-3 z-10 flex size-[26px] items-center justify-center rounded-full bg-grey-moss-900 text-white shadow-[0_4px_10px_rgba(0,0,0,0.3)]"
                  aria-label="Remove"
                >
                  <X className="size-3.5" strokeWidth={1.75} />
                </button>
              )}

              <BulkMediaPreview key={selectedItem.id} item={selectedItem} />

              {selectedItem.status === "uploading" && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/50">
                  <div className="mb-1.5 h-1.5 w-3/4 overflow-hidden rounded-full bg-grey-moss-300">
                    <div
                      className="h-full bg-white transition-all duration-300"
                      style={{ width: `${selectedItem.progress}%` }}
                    />
                  </div>
                  <span className="font-archivo text-xs text-white">
                    {Math.round(selectedItem.progress)}%
                  </span>
                </div>
              )}

              {selectedItem.status === "done" && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/35">
                  <div className="flex size-14 items-center justify-center rounded-full bg-white/95 shadow-sm">
                    <span className="text-[28px] leading-none text-grey-moss-900">✓</span>
                  </div>
                </div>
              )}

              {selectedItem.status === "error" && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-red-500/20">
                  <span className="font-archivo text-xs text-red-600">
                    {selectedItem.error || "Error"}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <input
          type="text"
          value={selectedItem.name}
          onChange={(e) => setItemName(selectedItem.id, e.target.value)}
          disabled={isCreating}
          placeholder="name"
          className="mt-3 w-full shrink-0 bg-transparent font-archivo text-[14px] text-[#6B6456] outline-none placeholder-[#B4AEA2] disabled:opacity-60"
        />

        <BulkThumbSwiper
          items={bulkItems}
          selectedIndex={selectedIndex}
          isCreating={isCreating}
          inputRef={inputRef}
          onSelect={setSelectedIndex}
          onRemove={handleRemoveAt}
        />
      </div>
    </div>
  );
};

export default BulkCenterGrid;
