"use client";

import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

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
      className="w-full rounded-sm bg-grey-moss-900 py-3 font-archivo text-lg text-grey-eggshell transition-colors hover:bg-grey-moss-700 disabled:cursor-not-allowed disabled:opacity-50"
    >
      {label}
    </button>
  );
};

export default BulkCreateButton;
