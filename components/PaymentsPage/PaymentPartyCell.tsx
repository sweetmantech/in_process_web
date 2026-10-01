"use client";

import { usePaymentsProvider } from "@/providers/PaymentsProvider";
import { getPaymentParty } from "@/lib/payments/getPaymentParty";
import type { PaymentTransferRow } from "@/types/payments";

interface PaymentPartyCellProps {
  payment: PaymentTransferRow;
}

const PaymentPartyCell = ({ payment }: PaymentPartyCellProps) => {
  const { paymentsTab } = usePaymentsProvider();
  const party = getPaymentParty(payment, paymentsTab);

  return (
    <div className="hidden min-w-0 items-center gap-2 md:flex">
      <span className="flex size-[22px] flex-none items-center justify-center rounded-full bg-grey-moss-900 text-[10px] uppercase text-grey-eggshell">
        {party.charAt(0)}
      </span>
      <span className="truncate text-sm text-grey-moss-400">{party}</span>
    </div>
  );
};

export default PaymentPartyCell;
