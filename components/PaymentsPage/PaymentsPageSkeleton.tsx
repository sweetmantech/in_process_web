import { Skeleton } from "@/components/ui/skeleton";
import { MANAGE_CARD_CLASS } from "@/lib/utils/classNames";
import PaymentsTableLoading from "./PaymentsTableLoading";

const PaymentsPageSkeleton = () => (
  <main className="flex flex-col gap-3 pb-6 font-archivo md:gap-4 md:pb-0">
    <div className={`${MANAGE_CARD_CLASS} h-[300px] p-4 md:px-6 md:py-[22px]`}>
      <Skeleton className="h-2.5 w-28" />
      <Skeleton className="mt-[18px] h-7 w-48" />
    </div>
    <Skeleton className="h-10 w-48" />
    <PaymentsTableLoading />
  </main>
);

export default PaymentsPageSkeleton;
