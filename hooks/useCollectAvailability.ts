import { useMomentProvider } from "@/providers/MomentProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { useSmartWalletProvider } from "@/providers/SmartWalletProvider";
import { useFrameProvider } from "@/providers/FrameProvider";
import { Protocol } from "@/types/moment";

const useCollectAvailability = () => {
  const { isSoldOut, isSaleActive, protocol } = useMomentProvider();
  const { isFarcasterMiniApp } = useUserProvider();
  const { isLoading: isSmartWalletLoading } = useSmartWalletProvider();
  const { frameReady } = useFrameProvider();

  const isInProcess = protocol === Protocol.InProcess;
  const isWalletLoading = isSmartWalletLoading || (isFarcasterMiniApp && !frameReady);
  const isCollectDisabled = !isSaleActive || isSoldOut || !isInProcess || isWalletLoading;
  const collectCtaLabel = isSoldOut || !isInProcess ? "sold out" : "collect";

  return { isCollectDisabled, collectCtaLabel };
};

export default useCollectAvailability;
