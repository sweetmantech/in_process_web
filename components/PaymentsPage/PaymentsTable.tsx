"use client";

import PaymentsTableLoading from "./PaymentsTableLoading";
import PaymentsTableError from "./PaymentsTableError";
import NoPaymentsFound from "./NoPaymentsFound";
import PaymentsColumnLabels from "./PaymentsColumnLabels";
import PaymentRow from "./PaymentRow";
import FetchMore from "@/components/FetchMore";
import { MANAGE_CARD_CLASS } from "@/lib/utils/classNames";
import { usePaymentsProvider } from "@/providers/PaymentsProvider";

const PaymentsTable = () => {
  const { payments, isPending, error, data, fetchMore, hasNextPage } = usePaymentsProvider();

  if (error) return <PaymentsTableError error={error} />;
  if (isPending && !data) return <PaymentsTableLoading />;
  if (payments.length === 0) return <NoPaymentsFound />;

  return (
    <div className={`${MANAGE_CARD_CLASS} flex flex-col overflow-hidden md:min-h-0`}>
      <PaymentsColumnLabels />
      <div className="md:min-h-0 md:flex-1 md:overflow-y-auto md:modern-scrollbar">
        {payments.map((payment) => (
          <PaymentRow key={String(payment.id)} payment={payment} />
        ))}
        {hasNextPage && <FetchMore fetchMore={fetchMore} />}
      </div>
    </div>
  );
};

export default PaymentsTable;
