import { useMomentProvider } from "@/providers/MomentProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { Protocol } from "@/types/moment";

const useCollectAvailability = () => {
  const { isSoldOut, isSaleActive, protocol } = useMomentProvider();
  const { isFarcasterMiniApp } = useUserProvider();
  const { isLoading: isSmartWalletLoading } = useSmartWalletProvider();
  const { miniAppReady } = useMiniAppProvider();

  const isInProcess = protocol === Protocol.InProcess;
  const isWalletLoading = isSmartWalletLoading || (isFarcasterMiniApp && !miniAppReady);
  const isCollectDisabled = !isSaleActive || isSoldOut || !isInProcess || isWalletLoading;
  const collectCtaLabel = isSoldOut || !isInProcess ? "sold out" : "collect";

  return { isCollectDisabled, collectCtaLabel };
};

export default useCollectAvailability;
