import { useQuery } from "@tanstack/react-query";
import { getTransferPayments } from "@/lib/payments/getTransferPayments";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import type { PaymentsTab } from "@/types/payments";

const usePaymentsCount = (paymentsTab: PaymentsTab) => {
  const { primaryWallet } = useWalletsProvider();

  const { data } = useQuery({
    queryKey: ["payments-count", paymentsTab, primaryWallet],
    queryFn: () => getTransferPayments(1, 1, paymentsTab, primaryWallet!),
    enabled: Boolean(primaryWallet),
    staleTime: 1000 * 60 * 5,
  });

  return data?.pagination.total_count;
};

export default usePaymentsCount;
