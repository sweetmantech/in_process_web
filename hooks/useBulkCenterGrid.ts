"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

const useBulkCenterGrid = () => {
  const { bulkItems, removeFile, setItemName, addFiles, isCreating } = useBulkCreateProvider();
  const inputRef = useRef<HTMLInputElement>(null);
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (bulkItems.length === 0) {
      setSelectedIndex(0);
      return;
    }
    setSelectedIndex((current) => Math.min(current, bulkItems.length - 1));
  }, [bulkItems.length]);

  const selectedItem = bulkItems[Math.min(selectedIndex, bulkItems.length - 1)];

  const onChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      const files = Array.from(e.target.files ?? []);
      if (files.length > 0) await addFiles(files);
      if (inputRef.current) inputRef.current.value = "";
    },
    [addFiles]
  );

  const handleRemoveSelected = useCallback(() => {
    if (!selectedItem) return;
    const nextIndex = selectedIndex > 0 ? selectedIndex - 1 : 0;
    removeFile(selectedItem.id);
    setSelectedIndex(nextIndex);
  }, [removeFile, selectedIndex, selectedItem]);

  const handleRemoveAt = useCallback(
    (id: string, index: number) => {
      removeFile(id);
      setSelectedIndex((current) => {
        if (bulkItems.length <= 1) return 0;
        if (index < current) return current - 1;
        if (index === current) return Math.max(0, current - 1);
        return current;
      });
    },
    [bulkItems.length, removeFile]
  );

  return {
    bulkItems,
    setItemName,
    isCreating,
    inputRef,
    onChange,
    selectedIndex,
    setSelectedIndex,
    selectedItem,
    handleRemoveSelected,
    handleRemoveAt,
  };
};

export default useBulkCenterGrid;
