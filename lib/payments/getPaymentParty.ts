import truncateAddress from "@/lib/utils/truncateAddress";
import type { PaymentTransferRow, PaymentsTab } from "@/types/payments";

export const getPaymentParty = (payment: PaymentTransferRow, paymentsTab: PaymentsTab): string => {
  const party = paymentsTab === "income" ? payment.collector : payment.moment.collection.artist;
  if (!party) return "unknown";
  return party.username || truncateAddress(party.address);
};
