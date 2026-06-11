"use client";

import { useRef } from "react";
import Collections from "@/components/Collections";
import Price from "@/components/CreateForm/Price";
import { useCreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";
import BulkCreateButton from "./BulkCreateButton";

const BulkSideForm = () => {
  const { openModal } = useCreateCollectionModalTriggerProvider();
  const { bulkItems, addFiles, clearAll, isCreating } = useBulkCreateProvider();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleAddMore = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files ?? []);
    if (files.length > 0) await addFiles(files);
    if (inputRef.current) inputRef.current.value = "";
  };

  return (
    <div className="col-span-1 w-full md:pl-12">
      <div className="flex h-fit flex-col space-y-3 pb-4">
        <p className="font-archivo text-sm text-grey-moss-500">
          {bulkItems.length} file{bulkItems.length !== 1 ? "s" : ""} selected
        </p>

        <Collections onCreateNew={openModal} disabled={isCreating} />

        <Price disabled={isCreating} />

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,audio/*,.glb,.gltf"
          className="hidden"
          onChange={handleAddMore}
        />

        <div className="flex gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            disabled={isCreating}
            className="flex-1 rounded-sm border border-grey-moss-400 py-2 font-archivo text-sm text-grey-moss-700 hover:bg-grey-moss-200 disabled:opacity-50"
          >
            + add more
          </button>
          <button
            type="button"
            onClick={clearAll}
            disabled={isCreating}
            className="flex-1 rounded-sm border border-grey-moss-400 py-2 font-archivo text-sm text-grey-moss-700 hover:bg-grey-moss-200 disabled:opacity-50"
          >
            clear all
          </button>
        </div>

        <BulkCreateButton />
      </div>
    </div>
  );
};

export default BulkSideForm;
