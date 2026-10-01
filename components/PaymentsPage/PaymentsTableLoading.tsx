import { Skeleton } from "@/components/ui/skeleton";
import { paymentsGridClassName } from "@/lib/payments/paymentsGridClassName";
import { MANAGE_CARD_CLASS } from "@/lib/utils/classNames";

const PaymentsTableLoading = () => (
  <div className={`${MANAGE_CARD_CLASS} overflow-hidden`}>
    {Array.from({ length: 5 }, (_, i) => (
      <div
        key={i}
        className={`${paymentsGridClassName} items-center border-b border-grey-moss-50 px-4 py-3 last:border-b-0 md:px-6`}
      >
        <div className="flex items-center gap-3">
          <Skeleton className="size-9 rounded-[10px]" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="hidden h-4 w-24 md:block" />
        <Skeleton className="h-5 w-20 rounded-xl" />
        <Skeleton className="hidden h-4 w-32 lg:block" />
      </div>
    ))}
  </div>
);

export default PaymentsTableLoading;
