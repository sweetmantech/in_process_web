"use client";

import usePaymentsCount from "@/hooks/usePaymentsCount";
import { usePaymentsProvider } from "@/providers/PaymentsProvider";
import type { PaymentsTab } from "@/types/payments";

interface PaymentsTabButtonProps {
  tab: PaymentsTab;
  label: string;
}

const PaymentsTabButton = ({ tab, label }: PaymentsTabButtonProps) => {
  const { paymentsTab, setPaymentsTab } = usePaymentsProvider();
  const count = usePaymentsCount(tab);
  const active = paymentsTab === tab;

  return (
    <button
      type="button"
      onClick={() => setPaymentsTab(tab)}
      className={`-mb-px inline-flex items-center gap-2 border-b-2 pb-[13px] font-archivo-bold text-[12.5px] uppercase tracking-[.1em] ${
        active ? "border-grey-moss-900 text-grey-moss-900" : "border-transparent text-[#A8A296]"
      }`}
    >
      {label}
      {count !== undefined && (
        <span className="font-archivo-medium text-[11px] tracking-normal text-[#A8A296]">
          {count}
        </span>
      )}
    </button>
  );
};

export default PaymentsTabButton;
