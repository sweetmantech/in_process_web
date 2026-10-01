"use client";

import usePaymentsCount from "@/hooks/usePaymentsCount";
import { usePaymentsProvider } from "@/providers/PaymentsProvider";
import PaymentsTabButton from "./PaymentsTabButton";

const PaymentsTabs = () => {
  const { paymentsTab } = usePaymentsProvider();
  const count = usePaymentsCount(paymentsTab);

  return (
    <section className="mt-[30px] flex items-center justify-between gap-4 border-b border-[#E4E0D7]">
      <div className="flex gap-7">
        <PaymentsTabButton tab="income" label="income" />
        <PaymentsTabButton tab="expense" label="expenses" />
      </div>
      {count !== undefined && (
        <span className="pb-[13px] text-[12.5px] text-[#A8A296]">{count} transactions</span>
      )}
    </section>
  );
};

export default PaymentsTabs;
