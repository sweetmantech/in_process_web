"use client";

import useBulkCenterGrid from "@/hooks/useBulkCenterGrid";
import BulkFileCard from "./BulkFileCard";

const BulkCenterGrid = () => {
  const { bulkItems, removeFile, setItemName, isCreating, inputRef, onChange } =
    useBulkCenterGrid();

  return (
    <div className="md:min-h-auto relative min-h-[400px] w-full overflow-y-auto bg-[url('/grid.svg')] bg-contain p-3 md:aspect-[571/692]">
      <input
        ref={inputRef}
        type="file"
        multiple
        accept="image/*,video/*,.pdf,audio/*,.glb,.gltf"
        className="hidden"
        onChange={onChange}
      />
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {bulkItems.map((item) => (
          <BulkFileCard
            key={item.id}
            item={item}
            onRemove={removeFile}
            onNameChange={setItemName}
            isCreating={isCreating}
          />
        ))}
      </div>
    </div>
  );
};

export default BulkCenterGrid;
