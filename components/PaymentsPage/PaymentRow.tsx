"use client";

import type { PaymentTransferRow } from "@/types/payments";
import { paymentsGridClassName } from "@/lib/payments/paymentsGridClassName";
import PaymentMomentCell from "./PaymentMomentCell";
import PaymentPartyCell from "./PaymentPartyCell";
import PaymentAmount from "./PaymentAmount";
import PaymentTimeCell from "./PaymentTimeCell";

interface PaymentRowProps {
  payment: PaymentTransferRow;
}

const PaymentRow = ({ payment }: PaymentRowProps) => (
  <div
    className={`${paymentsGridClassName} items-center border-t border-[#ECE8E0] px-4 py-3 transition-colors first:border-t-0 hover:bg-white/75`}
  >
    <PaymentMomentCell moment={payment.moment} />
    <PaymentPartyCell payment={payment} />
    <PaymentAmount payment={payment} />
    <PaymentTimeCell payment={payment} />
  </div>
);

export default PaymentRow;
