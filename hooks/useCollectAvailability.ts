import { CHAIN_ID, IS_TESTNET } from "@/lib/consts";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import { Protocol } from "@/types/moment";

const useCollectAvailability = () => {
  const { soldOut, isSaleActive, protocol, moment } = useMomentProvider();
  const { isLoading: isSmartWalletLoading } = useSmartAccountProvider();

  const isInProcess = protocol === Protocol.InProcess;
  const isInProcessOnChain = isInProcess && moment.chainId === CHAIN_ID;
  const effectiveSoldOut = IS_TESTNET ? false : soldOut;
  const isWalletLoading = isSmartWalletLoading;
  const isCollectDisabled =
    !isSaleActive || effectiveSoldOut || !isInProcessOnChain || isWalletLoading;
  const collectCtaLabel = effectiveSoldOut || !isInProcessOnChain ? "Sold out" : "Collect";

  return { isCollectDisabled, collectCtaLabel };
};

export default useCollectAvailability;
