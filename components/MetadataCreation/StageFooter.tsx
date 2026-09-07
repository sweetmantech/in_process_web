"use client";

import CollectionTag from "./CollectionTag";
import CreateButton from "@/components/CreateForm/CreateButton";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

const StageFooter = () => {
  const { isBulkMode } = useBulkCreateProvider();

  return (
    <div className="mt-[22px] hidden shrink-0 items-center justify-between gap-4 md:flex">
      <CollectionTag />
      {!isBulkMode && (
        <div className="shrink-0">
          <CreateButton />
        </div>
      )}
    </div>
  );
};

export default StageFooter;
