"use client";

import { useState, useCallback, useRef } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Address } from "viem";

import { BulkItem, BulkResult } from "@/types/bulk";
import { validateFile } from "@/lib/fileSelect/validateFile";
import { processFileToItem } from "@/lib/fileSelect/processFileToItem";
import { generateSingleFileMetadata } from "@/lib/metadata/generateSingleFileMetadata";
import { createMomentBatchApi } from "@/lib/moment/createMomentBatchApi";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { CHAIN_ID } from "@/lib/consts";
import buildSalesConfig from "@/lib/zora/buildSalesConfig";
import resolvePayoutRecipient from "@/lib/wallets/resolvePayoutRecipient";
import buildBatchContract from "@/lib/moment/buildBatchContract";
import buildBatchTokens from "@/lib/moment/buildBatchTokens";
import useRecaptchaToken from "./useRecaptchaToken";

const useBulkCreate = () => {
  const [bulkItems, setBulkItems] = useState<BulkItem[]>([]);
  const bulkItemsRef = useRef(bulkItems);
  bulkItemsRef.current = bulkItems;

  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState<BulkResult | null>(null);

  const { getAuthHeaders } = useAuthorizationProvider();
  const { isPrepared } = useUserProvider();
  const { walletsReady, primaryWallet, hasEOA } = useWalletsProvider();
  const { isMiniApp } = useMiniAppProvider();
  const { smartWallet } = useSmartAccountProvider();
  const { priceUnit, price, startDate } = useMetadataFormProvider();
  const { selectedCollection: collection, setSelectedCollection } = useCollectionsProvider();
  const { push } = useRouter();
  const recaptcha = useRecaptchaToken("bulk_upload");

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

  const clearAll = useCallback(() => {
    setBulkItems((prev) => {
      prev.forEach((i) => {
        if (i.previewUrl) URL.revokeObjectURL(i.previewUrl);
      });
      return [];
    });
    setResult(null);
  }, []);

  const updateItemStatus = (id: string, patch: Partial<BulkItem>) => {
    setBulkItems((prev) => prev.map((i) => (i.id === id ? { ...i, ...patch } : i)));
  };

  const createBatch = useCallback(async () => {
    if (!isPrepared()) return;
    if (!walletsReady) return;
    if (bulkItems.length === 0) return;

    const unnamedItems = bulkItems.filter((i) => !i.name.trim());
    if (unnamedItems.length > 0) {
      toast.error("Please name all items before creating");
      return;
    }

    try {
      setIsCreating(true);
      const headers = await getAuthHeaders();
      const client = { headers, recaptcha };
      const payoutRecipient = resolvePayoutRecipient(isMiniApp, hasEOA, primaryWallet, smartWallet);
      if (!payoutRecipient) throw new Error("Wallet not ready. Please try again.");

      const salesConfig = buildSalesConfig(priceUnit, price, startDate);

      const metadataUris: string[] = [];

      for (let i = 0; i < bulkItems.length; i++) {
        const item = bulkItems[i];
        updateItemStatus(item.id, { status: "uploading", progress: 0 });

        const mimeType = item.mimeType;
        const isImage = mimeType.includes("image");

        const imageFile = isImage ? item.file : null;
        const animationFile = !isImage ? item.file : null;

        const uri = await generateSingleFileMetadata({
          imageFile,
          animationFile,
          previewFile: item.previewFile,
          mimeType,
          name: item.name,
          description: "",
          link: "",
          client,
          onProgress: (p) => updateItemStatus(item.id, { progress: p }),
        });

        metadataUris.push(uri);
        updateItemStatus(item.id, { status: "done", progress: 100 });
      }

      const contract = buildBatchContract(collection, bulkItems[0].name, metadataUris[0]);
      const tokens = buildBatchTokens(metadataUris, salesConfig, payoutRecipient as string);

      const batchResult = await createMomentBatchApi({
        contract,
        tokens,
        account: primaryWallet as Address,
        chainId: CHAIN_ID,
      });

      setSelectedCollection(batchResult.contractAddress);

      const resultData: BulkResult = {
        contractAddress: batchResult.contractAddress,
        tokenIds: batchResult.tokenIds,
        items: bulkItems.map((item, idx) => ({
          name: item.name,
          previewUrl: item.previewUrl,
          tokenId: batchResult.tokenIds[idx] ?? "",
        })),
      };

      setResult(resultData);
      push(
        `/create/success?collectionAddress=${batchResult.contractAddress}&tokenIds=${batchResult.tokenIds.join(",")}`
      );
    } catch (err: any) {
      toast.error(err?.message || "Error creating moments");
      setBulkItems((prev) =>
        prev.map((i) => (i.status === "uploading" ? { ...i, status: "error" } : i))
      );
    } finally {
      setIsCreating(false);
    }
  }, [
    bulkItems,
    isPrepared,
    walletsReady,
    getAuthHeaders,
    isMiniApp,
    hasEOA,
    primaryWallet,
    smartWallet,
    priceUnit,
    price,
    startDate,
    collection,
    setSelectedCollection,
    push,
    recaptcha,
  ]);

  return {
    bulkItems,
    isBulkMode: bulkItems.length > 0,
    addFiles,
    removeFile,
    setItemName,
    clearAll,
    createBatch,
    isCreating,
    result,
    setResult,
  };
};

export default useBulkCreate;
