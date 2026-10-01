import { ExternalLink } from "lucide-react";
import type { PaymentTransferRow } from "@/types/payments";

interface PaymentTimeCellProps {
  payment: PaymentTransferRow;
}

const PaymentTimeCell = ({ payment }: PaymentTimeCellProps) => (
  <div className="hidden items-center justify-between gap-2.5 lg:flex">
    <span className="text-[12.5px] text-[#8C8678]">
      {new Date(payment.transferred_at).toLocaleString()}
    </span>
    <a
      href={`https://basescan.org/tx/${payment.transaction_hash}`}
      target="_blank"
      rel="noopener noreferrer"
      title="see transaction details"
      className="flex size-7 flex-none items-center justify-center rounded-lg text-[#A8A296] hover:bg-[#F1EEE8] hover:text-grey-moss-900"
    >
      <ExternalLink className="size-[15px]" />
    </a>
  </div>
);

export default PaymentTimeCell;
