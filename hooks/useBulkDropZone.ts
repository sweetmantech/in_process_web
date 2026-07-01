"use client";

import { useState, useRef, useCallback } from "react";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

const useBulkDropZone = (onSingleFile: (file: File) => void) => {
  const [isDragging, setIsDragging] = useState(false);
  const { addFiles } = useBulkCreateProvider();
  const inputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const suppressFileDialogRef = useRef(false);

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

  const onCameraChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) onSingleFile(file);
      if (cameraInputRef.current) cameraInputRef.current.value = "";
    },
    [onSingleFile]
  );

  const openFileDialog = useCallback(() => {
    if (suppressFileDialogRef.current) return;
    inputRef.current?.click();
  }, []);

  const openCameraDialog = useCallback(() => {
    suppressFileDialogRef.current = true;
    cameraInputRef.current?.click();
    window.setTimeout(() => {
      suppressFileDialogRef.current = false;
    }, 500);
  }, []);

  return {
    isDragging,
    inputRef,
    cameraInputRef,
    onDrop,
    onDragOver,
    onDragLeave,
    onChange,
    onCameraChange,
    openFileDialog,
    openCameraDialog,
  };
};

export default useBulkDropZone;
