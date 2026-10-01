"use client";

import { cn } from "@/lib/utils";
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
      className={cn(
        "-mb-px inline-flex min-w-[60px] items-center gap-1.5 border-b-2 border-transparent px-1 py-2.5 font-archivo text-[12.5px] uppercase tracking-wider text-grey-moss-300 hover:text-grey-moss-900",
        active && "border-b-grey-moss-900 font-archivo-medium text-grey-moss-900"
      )}
    >
      {label}
      {count !== undefined && <span className="text-[11px] text-grey-moss-300">{count}</span>}
    </button>
  );
};

export default PaymentsTabButton;
