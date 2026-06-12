"use client";

import { BulkDropZone } from "@/components/BulkUpload";
import SimpleDropHint from "./SimpleDropHint";

interface NoFileSelectedProps {
  onSingleFile?: (file: File) => void;
}

const NoFileSelected = ({ onSingleFile }: NoFileSelectedProps) => {
  if (!onSingleFile) return <SimpleDropHint />;

  return (
    <div className="size-full p-4">
      <BulkDropZone onSingleFile={onSingleFile} />
    </div>
  );
};

export default NoFileSelected;
