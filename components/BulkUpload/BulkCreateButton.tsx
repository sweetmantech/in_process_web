"use client";

import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";
import { CircleDot } from "lucide-react";

const BulkCreateButton = () => {
  const { bulkItems, createBatch, isCreating } = useBulkCreateProvider();
  const count = bulkItems.length;
  const allNamed = bulkItems.every((i) => i.name.trim());
  const uploadingCount = bulkItems.filter((i) => i.status === "uploading").length;
  const doneCount = bulkItems.filter((i) => i.status === "done").length;

  const label = isCreating
    ? uploadingCount > 0
      ? `uploading ${doneCount + 1} of ${count}...`
      : "creating..."
    : `create ${count} moment${count !== 1 ? "s" : ""}`;

  return (
    <button
      type="button"
      onClick={createBatch}
      disabled={isCreating || !allNamed || count === 0}
      className="flex w-full items-center justify-center gap-2 rounded-lg bg-grey-moss-900 px-4 py-4 font-archivo-bold text-[15.5px] text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:opacity-50 md:w-auto md:min-w-[160px] md:px-8 md:py-3.5"
    >
      <CircleDot className="size-[18px]" strokeWidth={1.75} />
      {label}
    </button>
  );
};

export default BulkCreateButton;
