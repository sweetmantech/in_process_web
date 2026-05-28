import { Address } from "viem";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { CHAIN_ID } from "@/lib/consts";
import type { CreateCollectionsParams } from "@/types/collections";

const useCreateCollectionParameters = () => {
  const { primaryWallet } = useWalletsProvider();
  const { name } = useMetadataFormProvider();
  const { generateMetadataUri } = useMetadataUploadProvider();

  const fetchParameters = async (): Promise<CreateCollectionsParams | undefined> => {
    const uri = await generateMetadataUri();
    if (!name || !primaryWallet) return;

    return {
      account: primaryWallet as Address,
      collection: { uri, name },
      chainId: CHAIN_ID,
    };
  };

  return { fetchParameters };
};

export default useCreateCollectionParameters;
