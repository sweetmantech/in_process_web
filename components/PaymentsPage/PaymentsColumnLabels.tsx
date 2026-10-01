"use client";

import { paymentsGridClassName } from "@/lib/payments/paymentsGridClassName";
import { usePaymentsProvider } from "@/providers/PaymentsProvider";

const PaymentsColumnLabels = () => {
  const { paymentsTab } = usePaymentsProvider();

  return (
    <div
      className={`${paymentsGridClassName} border-b border-grey-moss-50 px-4 py-3 text-[10px] uppercase tracking-[0.1em] text-grey-moss-300 md:px-6`}
    >
      <span>moment</span>
      <span className="hidden md:block">{paymentsTab === "income" ? "collector" : "artist"}</span>
      <span>amount</span>
      <span className="hidden lg:block">time</span>
    </div>
  );
};

export default PaymentsColumnLabels;
