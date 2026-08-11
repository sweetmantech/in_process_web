"use client";

import { useCallback, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMetadata } from "@/hooks/useMetadata";
import useCollection from "@/hooks/useCollection";
import { CHAIN_ID } from "@/lib/consts";
import fetchBatchSuccessMoments from "@/lib/batchSuccess/fetchBatchSuccessMoments";
import getBatchSuccessRequestState from "@/lib/batchSuccess/getBatchSuccessRequestState";
import getBatchSuccessDisplayState from "@/lib/batchSuccess/getBatchSuccessDisplayState";
import resolveBatchSuccessItems from "@/lib/batchSuccess/resolveBatchSuccessItems";
import { BulkResultItem } from "@/types/bulk";

const BATCH_SUCCESS_MOMENTS_STALE_MS = 1000 * 60 * 5; // match useMomentData; minted metadata rarely changes

const useBatchSuccess = () => {
  const { result, clearAll, bulkItems } = useBulkCreateProvider();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const { collections } = useCollectionsProvider();
  const { price, priceUnit } = useMetadataFormProvider();
  // Keep last rendered items so create→success never flashes skeleton if provider
  // state briefly clears while URL hydration catches up.
  const stickyItemsRef = useRef<BulkResultItem[]>([]);

  const { contractAddress, tokenIds, hasLocalItems, needsRemoteHydration } =
    getBatchSuccessRequestState({
      result,
      urlCollection: searchParams.get("collection") ?? "",
      urlTokenIdsParam: searchParams.get("tokenIds"),
    });

  const remoteMomentsQuery = useQuery({
    queryKey: ["batchSuccessMoments", contractAddress, tokenIds.join(",")],
    enabled: needsRemoteHydration,
    queryFn: () => fetchBatchSuccessMoments({ contractAddress, tokenIds }),
    staleTime: BATCH_SUCCESS_MOMENTS_STALE_MS,
  });

  const items = useMemo(() => {
    const resolved = resolveBatchSuccessItems({
      hasLocalItems,
      resultItems: result?.items ?? [],
      bulkItems,
      remoteItems: remoteMomentsQuery.data,
      stickyItems: stickyItemsRef.current,
    });
    if (resolved.length > 0) {
      stickyItemsRef.current = resolved;
    }
    return resolved;
  }, [hasLocalItems, result?.items, bulkItems, remoteMomentsQuery.data]);

  const collectionItem = collections.find(
    (c) => c.address.toLowerCase() === contractAddress.toLowerCase()
  );

  const { data: fetchedCollection } = useCollection({
    collectionAddress: contractAddress,
    chainId: collectionItem ? undefined : String(CHAIN_ID),
  });

  const collectionUri = collectionItem?.uri ?? fetchedCollection?.uri ?? "";
  const { data: collectionMetadata } = useMetadata(collectionUri);

  const { collectionName, collectionImageUrl, shareUrl, timelineHref, displayedPrice, isLoading } =
    getBatchSuccessDisplayState({
      contractAddress,
      collectionItem,
      fetchedCollection,
      collectionMetadata,
      items,
      price,
      priceUnit,
      needsRemoteHydration,
      isRemotePending: remoteMomentsQuery.isPending,
    });

  const timestamp = useMemo(() => new Date().toLocaleString(), []);

  const handleBackToCreate = useCallback(() => {
    stickyItemsRef.current = [];
    clearAll();
    push("/create");
  }, [clearAll, push]);

  return {
    items,
    collectionName,
    collectionImageUrl,
    shareUrl,
    timelineHref,
    displayedPrice,
    timestamp,
    isLoading,
    handleBackToCreate,
  };
};

export default useBatchSuccess;
