"use client";

import { useState, useRef, useCallback } from "react";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

const useBulkDropZone = (onSingleFile: (file: File) => void) => {
  const [isDragging, setIsDragging] = useState(false);
  const { addFiles } = useBulkCreateProvider();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFiles = useCallback(
    async (files: File[]) => {
      if (files.length === 0) return;
      if (files.length === 1) {
        onSingleFile(files[0]);
      } else {
        await addFiles(files);
      }
    },
    [addFiles, onSingleFile]
  );

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      handleFiles(Array.from(e.dataTransfer.files));
    },
    [handleFiles]
  );

  const onDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const onDragLeave = useCallback((e: React.DragEvent) => {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setIsDragging(false);
    }
  }, []);

  const onChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      handleFiles(Array.from(e.target.files ?? []));
      if (inputRef.current) inputRef.current.value = "";
    },
    [handleFiles]
  );

  const openFileDialog = useCallback(() => {
    inputRef.current?.click();
  }, []);

  return { isDragging, inputRef, onDrop, onDragOver, onDragLeave, onChange, openFileDialog };
};

export default useBulkDropZone;
