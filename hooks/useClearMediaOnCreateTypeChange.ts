"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import useTypeParam from "@/hooks/useTypeParam";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

/**
 * On create-tab switches, keep form details (title, price, collection, etc.)
 * and clear only media-related state (files, writing, link, embed, bulk).
 */
const useClearMediaOnCreateTypeChange = () => {
  const type = useTypeParam();
  const pathname = usePathname();
  const { resetFiles, setIsOpenPreviewUpload } = useMetadataFormProvider();
  const { clearAll } = useBulkCreateProvider();
  const prevTypeRef = useRef<string | null | undefined>(undefined);

  useEffect(() => {
    // Success page already has display data in provider; clearing would flash skeleton.
    if (pathname?.includes("/create/success")) return;

    if (prevTypeRef.current === undefined) {
      prevTypeRef.current = type;
      return;
    }
    if (prevTypeRef.current === type) return;
    prevTypeRef.current = type;

    resetFiles();
    clearAll();
    setIsOpenPreviewUpload(false);
  }, [type, pathname, resetFiles, clearAll, setIsOpenPreviewUpload]);
};

export default useClearMediaOnCreateTypeChange;
