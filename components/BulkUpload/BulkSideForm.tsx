"use client";

import { useRef } from "react";
import Collections from "@/components/Collections";
import Price from "@/components/CreateForm/Price";
import { useCreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";
import { Trash2 } from "lucide-react";

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
    <div className="col-span-1 w-full rounded-lg bg-white px-3 py-5 md:rounded-none md:bg-transparent md:px-0 md:py-0">
      <div className="flex h-fit flex-col gap-6 pb-4 md:min-h-full md:pb-0">
        <div className="flex items-center justify-between gap-3">
          <div className="font-spectral-italic text-lg text-grey-moss-900 md:text-[22px]">
            {bulkItems.length} media selected
          </div>
          <button
            type="button"
            onClick={clearAll}
            disabled={isCreating}
            className="inline-flex items-center gap-1.5 rounded-[18px] border border-[#DCD6CA] bg-transparent px-2.5 py-1.5 font-archivo-medium text-[11.5px] text-[#8C8678] hover:text-grey-moss-900 disabled:opacity-50 md:rounded-full md:text-xs"
          >
            <Trash2 className="size-[13px]" strokeWidth={1.75} />
            clear all
          </button>
        </div>

        <Collections onCreateNew={openModal} />

        <Price />

        <input
          ref={inputRef}
          type="file"
          multiple
          accept="image/*,video/*,.pdf,audio/*,.glb,.gltf"
          className="hidden"
          onChange={handleAddMore}
        />

        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          disabled={isCreating}
          className="rounded-[10px] border border-[#DCD6CA] py-2.5 font-archivo-medium text-[12.5px] uppercase tracking-[0.06em] text-grey-moss-900 hover:bg-[#F1EEE8] disabled:opacity-50"
        >
          + add more
        </button>

        <div className="hidden flex-1 md:block" />
      </div>
    </div>
  );
};

export default BulkSideForm;
