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
    <span
      className={`inline-flex items-center justify-self-start whitespace-nowrap rounded-full px-[11px] py-1 font-mono text-xs ${
        isIncome ? "bg-[#DCF3E2] text-[#1E6B33]" : "bg-[#F2E8CF] text-[#7E621C]"
      }`}
    >
      {isIncome ? "+" : "−"}
      {getPaymentAmount(payment, primaryWallet, paymentsTab)}
    </span>
  );
};

export default PaymentAmount;
