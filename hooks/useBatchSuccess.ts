"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";
import { CHAIN, SITE_ORIGINAL_URL } from "@/lib/consts";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";

const useBatchSuccess = () => {
  const { result, clearAll } = useBulkCreateProvider();
  const { push } = useRouter();

  const contractAddress = result?.contractAddress ?? "";
  const tokenIds = result?.tokenIds ?? [];
  const items = result?.items ?? [];
  const shortNetwork = getShortNetworkName(CHAIN.name.toLowerCase());

  const handleCreateMore = useCallback(() => {
    clearAll();
    push("/create");
  }, [clearAll, push]);

  const handleViewCollection = useCallback(() => {
    window.open(`${SITE_ORIGINAL_URL}/collection/${contractAddress}`, "_blank");
  }, [contractAddress]);

  const handleCopyAll = useCallback(async () => {
    const urls = tokenIds
      .map((id) => `${SITE_ORIGINAL_URL}/collect/${shortNetwork}:${contractAddress}/${id}`)
      .join("\n");
    await navigator.clipboard.writeText(urls);
    toast.success("All links copied!");
  }, [tokenIds, contractAddress, shortNetwork]);

  return {
    result,
    contractAddress,
    tokenIds,
    items,
    handleCreateMore,
    handleViewCollection,
    handleCopyAll,
  };
};

export default useBatchSuccess;
