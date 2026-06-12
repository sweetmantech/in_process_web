"use client";

import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";

import { BulkItem } from "@/types/bulk";
import { validateFile } from "@/lib/fileSelect/validateFile";
import { processFileToItem } from "@/lib/fileSelect/processFileToItem";

const useBulkItems = () => {
  const [bulkItems, setBulkItems] = useState<BulkItem[]>([]);
  const bulkItemsRef = useRef(bulkItems);
  bulkItemsRef.current = bulkItems;

  const addFiles = useCallback(async (files: File[]) => {
    const validFiles = files.filter((f) => {
      try {
        return validateFile(f);
      } catch {
        return false;
      }
    });

    const incomingVideos = validFiles.filter((f) => f.type.includes("video"));
    const alreadyHasVideo = bulkItemsRef.current.some((i) => i.mimeType.includes("video"));

    if (incomingVideos.length > 1 || (alreadyHasVideo && incomingVideos.length > 0)) {
      toast.error("Only one video is allowed per batch upload");
      return;
    }

    const processed = await Promise.all(validFiles.map(processFileToItem));
    setBulkItems((prev) => [...prev, ...processed]);
  }, []);

  const removeFile = useCallback((id: string) => {
    setBulkItems((prev) => {
      const item = prev.find((i) => i.id === id);
      if (item?.previewUrl) URL.revokeObjectURL(item.previewUrl);
      return prev.filter((i) => i.id !== id);
    });
  }, []);

  const setItemName = useCallback((id: string, name: string) => {
    setBulkItems((prev) => prev.map((i) => (i.id === id ? { ...i, name } : i)));
  }, []);

  const updateItemStatus = useCallback((id: string, patch: Partial<BulkItem>) => {
    setBulkItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  }, []);

  const markUploadingAsError = useCallback(() => {
    setBulkItems((prev) =>
      prev.map((i) => (i.status === "uploading" ? { ...i, status: "error" } : i))
    );
  }, []);

  const clearItems = useCallback(() => {
    setBulkItems((prev) => {
      prev.forEach((i) => {
        if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
      });
      return [];
    });
  }, []);

  return {
    bulkItems,
    addFiles,
    removeFile,
    setItemName,
    updateItemStatus,
    markUploadingAsError,
    clearItems,
  };
};

export default useBulkItems;
