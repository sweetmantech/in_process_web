import { Address } from "viem";
import { REFERRAL_RECIPIENT } from "@/lib/consts";
import getSalesConfig from "@/lib/zora/getSalesConfig";
import getSaleConfigType from "@/lib/getSaleConfigType";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMetadataUploadProvider } from "@/providers/MetadataUploadProvider";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";

const useMomentCreateParameters = () => {
  const { isMiniApp } = useMiniAppProvider();
  const { primaryWallet, hasEOA } = useWalletsProvider();
  const { smartWallet } = useSmartAccountProvider();
  const { form, priceUnit, price, startDate, name } = useMetadataFormProvider();
  const { generateMetadataUri } = useMetadataUploadProvider();
  const { selectedCollection: collection } = useCollectionsProvider();

  // Use priceUnit to determine if USDC
  const isUsdc = priceUnit === "usdc";
  const fetchParameters = async () => {
    const momentMetadataUri = await generateMetadataUri();
    if (!name) return;
    const salesConfig = getSalesConfig(
      getSaleConfigType(isUsdc ? "erc20Mint" : "fixedPrice"),
      price,
      startDate
    );

    const formSplits = form.getValues("splits");
    const splitsData = formSplits && formSplits.length > 0 ? formSplits : undefined;
    const totalSupply = form.getValues("totalSupply");

    // Unified contract format: use address if collection exists, otherwise use name/uri for new collection
    const contract = collection
      ? {
          address: collection,
        }
      : {
          name: name,
          uri: momentMetadataUri,
        };

    return {
      contract,
      token: {
        tokenMetadataURI: momentMetadataUri,
        createReferral: REFERRAL_RECIPIENT,
        salesConfig,
        mintToCreatorCount: 1,
        payoutRecipient: isMiniApp || hasEOA ? primaryWallet : smartWallet,
        ...(totalSupply !== undefined && { maxSupply: totalSupply }),
      },
      account: primaryWallet as Address,
      ...(splitsData && { splits: splitsData }),
    };
  };

  return { fetchParameters };
};

export default useMomentCreateParameters;
