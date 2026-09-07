"use client";

import Collections from "@/components/Collections";
import Price from "@/components/CreateForm/Price";
import { Textarea } from "@/components/ui/textarea";
import BulkCreateButton from "@/components/BulkUpload/BulkCreateButton";
import { useCreateCollectionModalTriggerProvider } from "@/providers/CollectionCreateProvider/CreateCollectionModalTriggerProvider";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";
import { Trash2 } from "lucide-react";

const BulkSideForm = () => {
  const { openModal } = useCreateCollectionModalTriggerProvider();
  const {
    bulkItems,
    clearAll,
    isCreating,
    selectedIndex,
    selectedItem,
    setItemName,
    setItemDescription,
  } = useBulkCreateProvider();

  const momentNumber = Math.min(selectedIndex, Math.max(bulkItems.length - 1, 0)) + 1;

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

        <div className="h-px w-full bg-[#E8E4DC]" />

        {selectedItem && (
          <div className="flex flex-col gap-[18px]">
            <div className="font-archivo-medium text-[11px] uppercase tracking-[0.08em] text-[#8C8678]">
              <span className="rounded-[4px] bg-[#EDEAE2] px-1.5 py-0.5 text-grey-moss-900">
                Editing
              </span>{" "}
              Moment {momentNumber} / {bulkItems.length}
            </div>

            <div className="flex w-full flex-col items-start">
              <label
                htmlFor={`bulk-title-${selectedItem.id}`}
                className="mb-1 font-archivo-medium text-[10.5px] uppercase tracking-[0.14em] text-[#A8A296]"
              >
                title
              </label>
              <input
                id={`bulk-title-${selectedItem.id}`}
                type="text"
                value={selectedItem.name}
                onChange={(e) => setItemName(selectedItem.id, e.target.value)}
                disabled={isCreating}
                placeholder="Name this moment"
                className="w-full border-0 border-b-[1.5px] border-[#DCD6CA] bg-transparent px-0.5 py-[9px] font-archivo text-[15px] text-grey-moss-900 outline-none transition-colors placeholder:text-[#B4AEA2] focus:border-grey-moss-900 disabled:opacity-60"
              />
            </div>

            <div className="flex w-full flex-col items-start">
              <label
                htmlFor={`bulk-description-${selectedItem.id}`}
                className="mb-1 font-archivo-medium text-[10.5px] uppercase tracking-[0.14em] text-[#A8A296]"
              >
                description
              </label>
              <Textarea
                id={`bulk-description-${selectedItem.id}`}
                value={selectedItem.description}
                onChange={(e) => setItemDescription(selectedItem.id, e.target.value)}
                disabled={isCreating}
                placeholder="What's the story behind this?"
                minRows={2}
                className="resize-none rounded-none border-0 border-b-[1.5px] border-[#DCD6CA] bg-transparent px-0.5 py-2 font-archivo text-[15px] text-grey-moss-900 shadow-none outline-none ring-0 placeholder:text-[#B4AEA2] focus-visible:border-grey-moss-900 focus-visible:ring-0 focus-visible:ring-offset-0 disabled:opacity-60"
              />
            </div>
          </div>
        )}

        <div className="h-px w-full bg-[#E8E4DC]" />

        <div className="hidden flex-1 md:block" />

        <div className="hidden md:block">
          <BulkCreateButton className="w-full md:w-full md:min-w-0" />
        </div>
      </div>
    </div>
  );
};

export default BulkSideForm;
