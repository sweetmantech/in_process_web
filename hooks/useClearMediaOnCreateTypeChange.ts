"use client";

import { useEffect, useRef } from "react";
import useTypeParam from "@/hooks/useTypeParam";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

/**
 * On create-tab switches, keep form details (title, price, collection, etc.)
 * and clear only media-related state (files, writing, link, embed, bulk).
 */
const useClearMediaOnCreateTypeChange = () => {
  const type = useTypeParam();
  const { resetFiles, setIsOpenPreviewUpload } = useMetadataFormProvider();
  const { clearAll } = useBulkCreateProvider();
  const prevTypeRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    if (prevTypeRef.current === undefined) {
      prevTypeRef.current = type;
      return;
    }
    if (prevTypeRef.current === type) return;
    prevTypeRef.current = type;

    resetFiles();
    clearAll();
    setIsOpenPreviewUpload(false);
  }, [type, resetFiles, clearAll, setIsOpenPreviewUpload]);
};

export default useClearMediaOnCreateTypeChange;
