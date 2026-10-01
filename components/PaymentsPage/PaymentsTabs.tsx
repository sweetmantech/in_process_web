"use client";

import usePaymentsCount from "@/hooks/usePaymentsCount";
import { usePaymentsProvider } from "@/providers/PaymentsProvider";
import PaymentsTabButton from "./PaymentsTabButton";

const PaymentsTabs = () => {
  const { paymentsTab } = usePaymentsProvider();
  const count = usePaymentsCount(paymentsTab);

  return (
    <section className="flex items-center justify-between gap-4 border-b border-grey-moss-200">
      <div className="flex gap-3 md:gap-5">
        <PaymentsTabButton tab="income" label="income" />
        <PaymentsTabButton tab="expense" label="expenses" />
      </div>
      {count !== undefined && (
        <span className="text-xs text-grey-moss-300">{count} transactions</span>
      )}
    </section>
  );
};

export default PaymentsTabs;
