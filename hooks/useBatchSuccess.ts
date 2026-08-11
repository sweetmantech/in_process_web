"use client";

import { useCallback, useMemo, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import type { Address } from "viem";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMetadata } from "@/hooks/useMetadata";
import useCollection from "@/hooks/useCollection";
import { CHAIN_ID, SITE_ORIGINAL_URL } from "@/lib/consts";
import { getCollectionTimelineUrl } from "@/lib/collection/getCollectionTimelineUrl";
import { getMomentApi } from "@/lib/moment/getMomentApi";
import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";
import { BulkItem, BulkResultItem } from "@/types/bulk";
import { MomentApiResponse } from "@/types/moment";

const parseTokenIdsParam = (raw: string | null): string[] =>
  (raw ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

const mapMomentApiToBulkResultItem = (
  tokenId: string,
  response: MomentApiResponse
): BulkResultItem => {
  const meta = response.metadata;
  const mime = meta?.content?.mime ?? "";
  const contentUri = meta?.content?.uri || meta?.animation_url || "";
  const imageUri = meta?.image || "";
  // Keep protocol URIs (ar://) for thumbs — BlurImage routes via /media/image.
  const previewUrl = imageUri;
  const fileUrl = contentUri || imageUri;

  return {
    name: meta?.name ?? "",
    previewUrl,
    fileUrl,
    mimeType: mime,
    fileName: "",
    tokenId,
    metadata: meta,
  };
};

const mergeLocalResultItems = (
  resultItems: BulkResultItem[],
  bulkItems: BulkItem[]
): BulkResultItem[] =>
  resultItems.map((item, index) => {
    const live = bulkItems[index];
    if (!live) return item;
    return {
      ...item,
      name: item.name || live.name,
      previewUrl: item.previewUrl || live.previewUrl,
      fileUrl: item.fileUrl || live.fileUrl,
      mimeType: item.mimeType || live.mimeType,
      fileName: item.fileName || live.file.name,
      tokenId: item.tokenId,
    };
  });

const useBatchSuccess = () => {
  const { result, clearAll, bulkItems } = useBulkCreateProvider();
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const { collections } = useCollectionsProvider();
  const { price, priceUnit } = useMetadataFormProvider();
  // Keep last rendered items so create→success never flashes skeleton if provider
  // state briefly clears while URL hydration catches up.
  const stickyItemsRef = useRef<BulkResultItem[]>([]);

  const urlCollection = searchParams.get("collection") ?? "";
  const urlTokenIds = useMemo(
    () => parseTokenIdsParam(searchParams.get("tokenIds")),
    [searchParams]
  );

  const contractAddress = result?.contractAddress || urlCollection;
  const tokenIds = result?.tokenIds?.length ? result.tokenIds : urlTokenIds;
  const hasLocalItems = Boolean(result?.items?.length);
  const needsRemoteHydration =
    !hasLocalItems && Boolean(contractAddress) && tokenIds.length > 0;

  const remoteMomentsQuery = useQuery({
    queryKey: ["batchSuccessMoments", contractAddress, tokenIds.join(",")],
    enabled: needsRemoteHydration,
    queryFn: async () => {
      const responses = await Promise.all(
        tokenIds.map((tokenId) =>
          getMomentApi({
            collectionAddress: contractAddress as Address,
            tokenId,
            chainId: CHAIN_ID,
          })
        )
      );
      return responses.map((response, index) =>
        mapMomentApiToBulkResultItem(tokenIds[index], response)
      );
    },
    staleTime: 1000 * 60 * 5,
  });

  // Prefer live bulk item media URLs/mime so success preview stays playable.
  const items = useMemo<BulkResultItem[]>(() => {
    if (hasLocalItems) {
      const merged = mergeLocalResultItems(result?.items ?? [], bulkItems);
      stickyItemsRef.current = merged;
      return merged;
    }
    if (remoteMomentsQuery.data?.length) {
      stickyItemsRef.current = remoteMomentsQuery.data;
      return remoteMomentsQuery.data;
    }
    return stickyItemsRef.current;
  }, [hasLocalItems, result?.items, bulkItems, remoteMomentsQuery.data]);

  const collectionItem = collections.find(
    (c) => c.address.toLowerCase() === contractAddress.toLowerCase()
  );

  const { data: fetchedCollection } = useCollection({
    collectionAddress: contractAddress,
    chainId: collectionItem ? undefined : String(CHAIN_ID),
  });

  const collectionName =
    collectionItem?.name ?? fetchedCollection?.name ?? "Collection";
  const collectionUri = collectionItem?.uri ?? fetchedCollection?.uri ?? "";
  const { data: collectionMetadata } = useMetadata(collectionUri);
  const collectionImageUrl = useMemo(() => {
    const raw = collectionMetadata?.image ?? fetchedCollection?.metadata?.image;
    if (raw) return getFetchableUrl(raw) || raw;
    return items[0]?.previewUrl || "";
  }, [collectionMetadata?.image, fetchedCollection?.metadata?.image, items]);
  const timelineHref = getCollectionTimelineUrl(CHAIN_ID, contractAddress, SITE_ORIGINAL_URL);
  const shareUrl = timelineHref;
  const displayedPrice = `${price} ${priceUnit.toUpperCase()}`;
  const timestamp = useMemo(() => new Date().toLocaleString(), []);
  // Skeleton only for cold refresh: nothing to show yet.
  const isLoading =
    needsRemoteHydration && items.length === 0 && remoteMomentsQuery.isPending;

  const handleBackToCreate = useCallback(() => {
    stickyItemsRef.current = [];
    clearAll();
    push("/create");
  }, [clearAll, push]);

  return {
    result,
    contractAddress,
    tokenIds,
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
