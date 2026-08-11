"use client";

import useBulkCenterGrid from "@/hooks/useBulkCenterGrid";
import BulkFileCard from "./BulkFileCard";
import { Plus } from "lucide-react";

const BulkCenterGrid = () => {
  const { bulkItems, removeFile, setItemName, isCreating, inputRef, onChange } =
    useBulkCenterGrid();

  return (
    <div className="relative min-h-[400px] w-full flex-1 overflow-y-auto md:min-h-0">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,audio/*,.glb,.gltf"
        className="hidden"
        onChange={onChange}
      />
      <div className="grid grid-cols-2 gap-4 p-0.5 sm:grid-cols-3 md:grid-cols-[repeat(auto-fill,minmax(190px,1fr))]">
        {bulkItems.map((item) => (
          <BulkFileCard
            key={item.id}
            item={item}
            onRemove={removeFile}
            onNameChange={setItemName}
            isCreating={isCreating}
          />
        ))}
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isCreating}
          className="flex aspect-square w-full flex-col items-center justify-center gap-2 rounded-xl border-[1.5px] border-dashed border-[#C9C4B9] bg-white/40 text-[#8C8678] transition-colors hover:border-grey-moss-900 hover:text-grey-moss-900 disabled:opacity-50"
        >
          <Plus className="size-[26px]" strokeWidth={1.75} />
          <span className="font-archivo-medium text-[12.5px] uppercase tracking-[0.06em]">
            add media
          </span>
        </button>
      </div>
    </div>
  );
};

export default BulkCenterGrid;
