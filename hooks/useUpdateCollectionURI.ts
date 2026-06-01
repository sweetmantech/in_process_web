import { useState } from "react";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { toast } from "sonner";
import { callUpdateCollectionURI } from "@/lib/collection/callUpdateCollectionURI";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { Address } from "viem";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { isPermissionError } from "@/lib/errors/isPermissionError";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";

const useUpdateCollectionURI = () => {
  const { data: collection } = useCollectionProvider();
  const { name } = useMetadataFormProvider();
  const { getAuthHeaders } = useAuthorizationProvider();
  const { generateMetadataUri } = useMetadataUploadProvider();
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const updateCollectionURI = async () => {
    setIsLoading(true);
    try {
      if (!name) {
        throw new Error("Missing collection name");
      }

      if (!collection) {
        throw new Error("Collection not found");
      }

      // Use existing metadata generation, merging with existing metadata
      const existingMetadata = collection.metadata ?? null;
      const newUri = await generateMetadataUri(existingMetadata);

      await callUpdateCollectionURI({
        collection: {
          address: collection.address as Address,
          chainId: collection.chain_id,
        },
        newCollectionName: name,
        newUri,
        authHeaders: await getAuthHeaders(),
      });
    } catch (error: any) {
      console.error(error);
      if (!isPermissionError(error)) {
        toast.error(error?.message || "Failed to update collection metadata");
      }
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    updateCollectionURI,
    isLoading,
  };
};

export default useUpdateCollectionURI;
