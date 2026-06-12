"use client";

import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Address } from "viem";

import { BulkResult } from "@/types/bulk";
import { generateSingleFileMetadata } from "@/lib/metadata/generateSingleFileMetadata";
import { createMomentBatchApi } from "@/lib/moment/createMomentBatchApi";

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

import useBulkItems from "./useBulkItems";

const useBulkCreate = () => {
  const {
    bulkItems,
    addFiles,
    removeFile,
    setItemName,
    updateItemStatus,
    markUploadingAsError,
    clearItems,
  } = useBulkItems();

  const [isCreating, setIsCreating] = useState(false);
  const [result, setResult] = useState<BulkResult | null>(null);


  const { isPrepared } = useUserProvider();
  const { walletsReady, primaryWallet, hasEOA } = useWalletsProvider();
  const { isMiniApp } = useMiniAppProvider();
  const { smartWallet } = useSmartAccountProvider();
  const { priceUnit, price, startDate } = useMetadataFormProvider();
  const { selectedCollection: collection, setSelectedCollection } = useCollectionsProvider();
  const { push } = useRouter();


  const clearAll = useCallback(() => {
    clearItems();
    setResult(null);
  }, [clearItems]);

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
      const payoutRecipient = resolvePayoutRecipient(isMiniApp, hasEOA, primaryWallet, smartWallet);
      if (!payoutRecipient) throw new Error("Wallet not ready. Please try again.");

      const salesConfig = buildSalesConfig(priceUnit, price, startDate);
      const metadataUris: string[] = [];

      for (let i = 0; i < bulkItems.length; i++) {
        const item = bulkItems[i];
        updateItemStatus(item.id, { status: "uploading", progress: 0 });

        const isImage = item.mimeType.includes("image");
        const uri = await generateSingleFileMetadata({
          imageFile: isImage ? item.file : null,
          animationFile: isImage ? null : item.file,
          previewFile: item.previewFile,
          mimeType: item.mimeType,
          name: item.name,
          description: "",
          link: "",
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
      markUploadingAsError();
    } finally {
      setIsCreating(false);
    }
  }, [
    bulkItems,
    isPrepared,
    walletsReady,
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
    updateItemStatus,
    markUploadingAsError,
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
