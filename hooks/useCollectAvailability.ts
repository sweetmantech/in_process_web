import { useMomentProvider } from "@/providers/MomentProvider";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import { Protocol } from "@/types/moment";

const useCollectAvailability = () => {
  const { isSoldOut, isSaleActive, protocol } = useMomentProvider();
  const { isLoading: isSmartWalletLoading } = useSmartAccountProvider();

  const isInProcess = protocol === Protocol.InProcess;
  const isWalletLoading = isSmartWalletLoading;
  const isCollectDisabled = !isSaleActive || isSoldOut || !isInProcess || isWalletLoading;
  const collectCtaLabel = isSoldOut || !isInProcess ? "sold out" : "collect";

  return { isCollectDisabled, collectCtaLabel };
};

export default useCollectAvailability;
