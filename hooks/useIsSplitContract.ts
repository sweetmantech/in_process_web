import { useQuery } from "@tanstack/react-query";
import { useMomentProvider } from "@/providers/MomentProvider";
import isSplitContract from "@/lib/splits/isSplitContract";

const useIsSplitContract = () => {
  const { saleConfig, moment } = useMomentProvider();
  const fundsRecipient = saleConfig?.fundsRecipient;
  const { data: isSplit, isLoading } = useQuery({
    queryKey: ["isSplitContract", fundsRecipient, moment.chainId],
    queryFn: () => isSplitContract(fundsRecipient!, moment.chainId),
    enabled: Boolean(fundsRecipient),
  });

  return { isSplit, isLoading, fundsRecipient };
};

export default useIsSplitContract;
