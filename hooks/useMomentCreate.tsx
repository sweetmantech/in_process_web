"use client";

import { useState } from "react";
import useMomentCreateParameters from "./useMomentCreateParameters";
import { useUserProvider } from "@/providers/UserProvider";
import { createMomentApi } from "@/lib/moment/createMomentApi";
import { toast } from "sonner";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useRouter } from "next/navigation";
import useTypeParam from "./useTypeParam";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";

export default function useMomentCreate() {
  const [creating, setCreating] = useState<boolean>(false);
  const [createdTokenId, setCreatedTokenId] = useState<string>("");
  const { fetchParameters } = useMomentCreateParameters();
  const { isPrepared } = useUserProvider();
  const { walletsReady } = useWalletsProvider();
  const { setUploadProgress, setIsUploading } = useMetadataFormProvider();
  const { push } = useRouter();
  const type = useTypeParam();
  const { setSelectedCollection } = useCollectionsProvider();

  const create = async () => {
    try {
      if (!isPrepared()) return;
      if (!walletsReady) return;
      setCreating(true);
      setIsUploading(true);
      setUploadProgress(0);

      const parameters = await fetchParameters();
      if (!parameters) {
        throw new Error("Parameters not ready");
      }
      const result = await createMomentApi(parameters);
      setSelectedCollection(result.contractAddress);
      const INDEXER_SETTLE_MS = 3000; // wait for indexer to pick up newly minted token
      await new Promise((resolve) => setTimeout(resolve, INDEXER_SETTLE_MS));

      setIsUploading(false);
      setUploadProgress(100);
      setCreatedTokenId(result.tokenId.toString());

      const typeParam = type ? `type=${type}&` : "";
      const collectionParam = `collection=${result.contractAddress}&`;
      push(`/create/success?${typeParam}${collectionParam}tokenId=${result.tokenId.toString()}`);
      setCreating(false);
      return result;
    } catch (err: any) {
      setCreating(false);
      setIsUploading(false);
      setUploadProgress(0);
      toast.error(err?.message || "Error creating");
    }
  };

  return {
    createdTokenId,
    setCreatedTokenId,
    create,
    creating,
  };
}
