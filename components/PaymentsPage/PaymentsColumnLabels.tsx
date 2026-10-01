"use client";

import { paymentsGridClassName } from "@/lib/payments/paymentsGridClassName";
import { usePaymentsProvider } from "@/providers/PaymentsProvider";

const PaymentsColumnLabels = () => {
  const { paymentsTab } = usePaymentsProvider();

  return (
    <div
      className={`${paymentsGridClassName} px-4 pb-2 pt-4 font-archivo-bold text-[11px] uppercase tracking-[.1em] text-[#A8A296]`}
    >
      <span>moment</span>
      <span className="hidden md:block">{paymentsTab === "income" ? "collector" : "artist"}</span>
      <span>amount</span>
      <span className="hidden lg:block">time</span>
    </div>
  );
};

export default PaymentsColumnLabels;
