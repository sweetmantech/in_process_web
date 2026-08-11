"use client";

import CollectionTag from "./CollectionTag";
import CreateButton from "@/components/CreateForm/CreateButton";
import BulkCreateButton from "@/components/BulkUpload/BulkCreateButton";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

const StageFooter = () => {
  const { isBulkMode } = useBulkCreateProvider();

  return (
    <div className="mt-[22px] hidden shrink-0 items-center justify-between gap-4 md:flex">
      <CollectionTag />
      <div className="shrink-0">{isBulkMode ? <BulkCreateButton /> : <CreateButton />}</div>
    </div>
  );
};

export default StageFooter;
