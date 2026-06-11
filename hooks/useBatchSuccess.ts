"use client";

import { useCallback } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useMetadata } from "@/hooks/useMetadata";
import { SITE_ORIGINAL_URL } from "@/lib/consts";

const useBatchSuccess = () => {
  const { result, clearAll } = useBulkCreateProvider();
  const { push } = useRouter();
  const { collections } = useCollectionsProvider();

  const contractAddress = result?.contractAddress ?? "";
  const tokenIds = result?.tokenIds ?? [];
  const items = result?.items ?? [];

  const collectionItem = collections.find(
    (c) => c.address.toLowerCase() === contractAddress.toLowerCase()
  );
  const { data: metadata } = useMetadata(collectionItem?.uri ?? "");
  const collectionName = collectionItem?.name ?? "";
  const collectionDescription = (metadata?.description as string) ?? "";

  const handleCreateMore = useCallback(() => {
    clearAll();
    push("/create");
  }, [clearAll, push]);

  const handleShare = useCallback(async () => {
    await navigator.clipboard.writeText(`${SITE_ORIGINAL_URL}/collection/${contractAddress}`);
    toast.success("copied!");
  }, [contractAddress]);

  return {
    result,
    contractAddress,
    tokenIds,
    items,
    collectionName,
    collectionDescription,
    handleCreateMore,
    handleShare,
  };
};

export default useBatchSuccess;
