"use client";

import PaymentsTableLoading from "./PaymentsTableLoading";
import PaymentsTableError from "./PaymentsTableError";
import NoPaymentsFound from "./NoPaymentsFound";
import PaymentsColumnLabels from "./PaymentsColumnLabels";
import PaymentRow from "./PaymentRow";
import FetchMore from "@/components/FetchMore";
import { usePaymentsProvider } from "@/providers/PaymentsProvider";

const PaymentsTable = () => {
  const { payments, isPending, error, data, fetchMore, hasNextPage } = usePaymentsProvider();

  if (error) return <PaymentsTableError error={error} />;
  if (isPending && !data) return <PaymentsTableLoading />;
  if (payments.length === 0) return <NoPaymentsFound />;

  return (
    <section>
      <PaymentsColumnLabels />
      <div className="mt-3.5 overflow-hidden rounded-[14px] border border-[#E4E0D7] bg-white/60">
        {payments.map((payment) => (
          <PaymentRow key={String(payment.id)} payment={payment} />
        ))}
      </div>
      {hasNextPage && <FetchMore fetchMore={fetchMore} />}
    </section>
  );
};

export default PaymentsTable;
