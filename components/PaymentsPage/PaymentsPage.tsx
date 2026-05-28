"use client";

import PaymentsTable from "@/components/PaymentsPage/PaymentsTable";
import PaymentsTabs from "@/components/PaymentsPage/PaymentsTabs";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { WithdrawModal } from "@/components/PaymentsPage/WithdrawModal";
import PaymentsPageSkeleton from "./PaymentsPageSkeleton";
import SignToInProcess from "../ManagePage/SignToInProcess";
import { PaymentsProvider } from "@/providers/PaymentsProvider";

const PaymentsPage = () => {
  const { primaryWallet, walletsReady } = useWalletsProvider();

  if (!walletsReady) return <PaymentsPageSkeleton />;
  if (!primaryWallet) return <SignToInProcess />;

  return (
    <PaymentsProvider>
      <main className="flex flex-col gap-4 font-archivo">
        <div className="flex justify-end">
          <WithdrawModal />
        </div>
        <PaymentsTabs />
        <PaymentsTable />
      </main>
    </PaymentsProvider>
  );
};

export default PaymentsPage;
