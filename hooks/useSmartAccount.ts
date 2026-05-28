import { useQuery } from "@tanstack/react-query";
import { useUserProvider } from "@/providers/UserProvider";
import callSmartWalletBalancesApi from "@/lib/smartwallets/callSmartWalletBalancesApi";
import { CHAIN_ID } from "@/lib/consts";

const useSmartAccount = () => {
  const { userId } = useUserProvider();

  const query = useQuery({
    queryKey: ["smart_wallet_balances", userId, CHAIN_ID],
    queryFn: () => callSmartWalletBalancesApi(userId as string, CHAIN_ID),
    enabled: Boolean(userId),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
  });

  return {
    smartWallet: query.data?.smartWallet ?? "",
    isLoading: query.isLoading || query.isFetching,
    balance: query.data?.usdcBalance ?? "0.00",
    usdcBalance: query.data?.usdcBalance ?? "0.00",
    ethBalance: query.data?.ethBalance ?? "0.00",
    refetch: query.refetch,
  };
};

export default useSmartAccount;
