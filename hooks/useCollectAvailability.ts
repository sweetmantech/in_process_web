import { useMomentProvider } from "@/providers/MomentProvider";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import { Protocol } from "@/types/moment";
import { base } from "viem/chains";

const useCollectAvailability = () => {
  const { soldOut, isSaleActive, protocol, moment } = useMomentProvider();
  const { isLoading: isSmartWalletLoading } = useSmartAccountProvider();

  const isInProcess = protocol === Protocol.InProcess;
  const isInProcessOnBase = isInProcess && moment.chainId === base.id;
  const isWalletLoading = isSmartWalletLoading;
  const isCollectDisabled = !isSaleActive || soldOut || !isInProcessOnBase || isWalletLoading;
  const collectCtaLabel = soldOut || !isInProcessOnBase ? "sold out" : "collect";

  return { isCollectDisabled, collectCtaLabel };
};

export default useCollectAvailability;
