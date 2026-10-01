"use client";

import { getPaymentAmount } from "@/lib/payments/getPaymentAmount";
import { usePaymentsProvider } from "@/providers/PaymentsProvider";
import type { PaymentTransferRow } from "@/types/payments";

interface PaymentAmountProps {
  payment: PaymentTransferRow;
}

const PaymentAmount = ({ payment }: PaymentAmountProps) => {
  const { paymentsTab, primaryWallet } = usePaymentsProvider();
  const isIncome = paymentsTab === "income";

  return (
    <span className="inline-flex items-center gap-[5px] justify-self-start whitespace-nowrap rounded-xl bg-grey-moss-50 px-[9px] py-[3px] text-xs text-grey-moss-900">
      <span className={`h-1.5 w-1.5 rounded-full ${isIncome ? "bg-[#7FD58A]" : "bg-[#FDAD00]"}`} />
      {isIncome ? "+" : "−"}
      {getPaymentAmount(payment, primaryWallet, paymentsTab)}
    </span>
  );
};

export default PaymentAmount;
