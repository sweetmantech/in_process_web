import { Skeleton } from "@/components/ui/skeleton";
import { paymentsGridClassName } from "@/lib/payments/paymentsGridClassName";

const PaymentsTableLoading = () => (
  <div className="mt-[50px] overflow-hidden rounded-[14px] border border-[#E4E0D7] bg-white/60">
    {[...Array(5)].map((_, i) => (
      <div
        key={i}
        className={`${paymentsGridClassName} items-center border-t border-[#ECE8E0] px-4 py-3 first:border-t-0`}
      >
        <div className="flex items-center gap-[13px]">
          <Skeleton className="size-[42px] rounded-[9px]" />
          <Skeleton className="h-4 w-40" />
        </div>
        <Skeleton className="hidden h-4 w-24 md:block" />
        <Skeleton className="h-6 w-20 rounded-full" />
        <Skeleton className="hidden h-4 w-32 lg:block" />
      </div>
    ))}
  </div>
);

export default PaymentsTableLoading;
