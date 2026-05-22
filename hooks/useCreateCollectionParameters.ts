import { Address } from "viem";
import { useUserProvider } from "@/providers/UserProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { CHAIN_ID } from "@/lib/consts";
import type { CreateCollectionsParams } from "@/types/collections";

const useCreateCollectionParameters = () => {
  const { artistWallet } = useUserProvider();
  const { name } = useMetadataFormProvider();
  const { generateMetadataUri } = useMetadataUploadProvider();

  const fetchParameters = async (): Promise<CreateCollectionsParams | undefined> => {
    const uri = await generateMetadataUri();
    if (!name || !artistWallet) return;

    return {
      account: artistWallet as Address,
      collections: [{ uri, name }],
      chainId: CHAIN_ID,
    };
  };

  return { fetchParameters };
};

export default useCreateCollectionParameters;
