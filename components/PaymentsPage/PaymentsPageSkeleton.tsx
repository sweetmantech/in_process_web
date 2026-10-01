import { Skeleton } from "@/components/ui/skeleton";
import PaymentsTableLoading from "./PaymentsTableLoading";

const PaymentsPageSkeleton = () => (
  <main className="flex flex-col font-archivo">
    <Skeleton className="h-[110px] w-full rounded-2xl" />
    <Skeleton className="mt-[30px] h-8 w-56" />
    <PaymentsTableLoading />
  </main>
);

export default PaymentsPageSkeleton;
