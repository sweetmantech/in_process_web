import { useQuery } from "@tanstack/react-query";
import { Address } from "viem";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import fetchOperationalSmartWallet from "@/lib/smartwallets/fetchOperationalSmartWallet";

const useOperationalSmartWallet = () => {
  const { primaryWallet } = useWalletsProvider();

  const query = useQuery({
    queryKey: ["operational_smart_wallet", primaryWallet],
    queryFn: () => fetchOperationalSmartWallet(primaryWallet as Address),
    enabled: Boolean(primaryWallet),
    staleTime: 1000 * 60 * 5,
  });

  return {
    operationalSmartWallet: query.data,
    isLoading: query.isLoading,
  };
};

export default useOperationalSmartWallet;
