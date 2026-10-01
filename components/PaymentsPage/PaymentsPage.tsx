"use client";

import PaymentsTable from "@/components/PaymentsPage/PaymentsTable";
import PaymentsTabs from "@/components/PaymentsPage/PaymentsTabs";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import PaymentsPageSkeleton from "./PaymentsPageSkeleton";
import SignToInProcess from "../ManagePage/SignToInProcess";
import { PaymentsProvider } from "@/providers/PaymentsProvider";
import BalanceCard from "./BalanceCard";

const PaymentsPage = () => {
  const { primaryWallet, walletsReady } = useWalletsProvider();

  if (!walletsReady) return <PaymentsPageSkeleton />;
  if (!primaryWallet) return <SignToInProcess />;

  return (
    <PaymentsProvider>
      <main className="flex flex-col gap-3 pb-6 font-archivo md:h-full md:gap-4 md:pb-1">
        <BalanceCard />
        <PaymentsTabs />
        <PaymentsTable />
      </main>
    </PaymentsProvider>
  );
};

export default PaymentsPage;
