import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useMemo, useState } from "react";
import { getTransferPayments } from "@/lib/payments/getTransferPayments";
import type { PaymentsTab } from "@/types/payments";
import { useWalletsProvider } from "@/providers/WalletsProvider";

const PAYMENTS_QUERY_PAGE_LIMIT = 10;

const usePayments = () => {
  const { primaryWallet } = useWalletsProvider();
  const [paymentsTab, setTab] = useState<PaymentsTab>("income");
  const [currentPage, setCurrentPage] = useState(1);

  const paymentsQuery = useQuery({
    queryKey: [
      "payments-transfers",
      PAYMENTS_QUERY_PAGE_LIMIT,
      paymentsTab,
      primaryWallet,
      currentPage,
    ],
    queryFn: () =>
      getTransferPayments(currentPage, PAYMENTS_QUERY_PAGE_LIMIT, paymentsTab, primaryWallet!),
    enabled: Boolean(primaryWallet),
    staleTime: 1000 * 60 * 5,
    retry: (failureCount) => failureCount < 3,
    placeholderData: keepPreviousData,
  });

  const totalPages = paymentsQuery.data?.pagination.total_pages ?? 1;

  return useMemo(
    () => ({
      paymentsTab,
      setPaymentsTab: (tab: PaymentsTab) => {
        setTab(tab);
        setCurrentPage(1);
      },
      primaryWallet,
      payments: paymentsQuery.data?.transfers ?? [],
      totalCount: paymentsQuery.data?.pagination.total_count ?? 0,
      currentPage,
      limit: PAYMENTS_QUERY_PAGE_LIMIT,
      hasPrevPage: currentPage > 1,
      hasNextPage: currentPage < totalPages,
      goPrevPage: () => setCurrentPage((page) => Math.max(1, page - 1)),
      goNextPage: () => setCurrentPage((page) => Math.min(totalPages, page + 1)),
      data: paymentsQuery.data,
      isPending: paymentsQuery.isPending,
      error: paymentsQuery.error instanceof Error ? paymentsQuery.error : null,
    }),
    [
      primaryWallet,
      paymentsTab,
      currentPage,
      totalPages,
      paymentsQuery.data,
      paymentsQuery.isPending,
      paymentsQuery.error,
    ]
  );
};

export default usePayments;
