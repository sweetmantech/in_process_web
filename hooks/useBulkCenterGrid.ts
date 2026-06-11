"use client";

import { useRef, useCallback } from "react";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

const useBulkCenterGrid = () => {
  const { bulkItems, removeFile, setItemName, addFiles, isCreating } = useBulkCreateProvider();
  const inputRef = useRef<HTMLInputElement>(null);

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (files.length > 0) await addFiles(files);
      if (inputRef.current) inputRef.current.value = "";
    },
    [addFiles]
  );

  return { bulkItems, removeFile, setItemName, isCreating, inputRef, onChange };
};

export default useBulkCenterGrid;
