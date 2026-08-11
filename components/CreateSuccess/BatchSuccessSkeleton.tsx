import { Skeleton } from "@/components/ui/skeleton";

const BatchSuccessSkeleton = () => {
  return (
    <div className="col-span-1 w-full md:col-span-2">
      <div className="mx-auto mt-2 w-full max-w-[1120px] px-[6px] pb-12 md:mt-9 md:px-10 md:pb-20">
        <Skeleton className="mb-6 h-5 w-36" />
        <div className="grid items-start gap-6 md:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)] md:gap-10">
          <div className="min-w-0">
            <Skeleton className="aspect-square w-full rounded-[16px]" />
            <div className="mt-3.5 flex gap-3">
              <Skeleton className="size-[78px] rounded-[11px]" />
              <Skeleton className="size-[78px] rounded-[11px]" />
              <Skeleton className="size-[78px] rounded-[11px]" />
            </div>
          </div>
          <div className="flex min-w-0 flex-col">
            <Skeleton className="h-9 w-64" />
            <Skeleton className="mt-4 h-3 w-20" />
            <Skeleton className="mt-2 h-8 w-48" />
            <div className="mt-4 flex gap-2">
              <Skeleton className="h-8 w-12 rounded-[22px]" />
              <Skeleton className="h-8 w-12 rounded-[22px]" />
              <Skeleton className="h-8 w-12 rounded-[22px]" />
            </div>
            <div className="mt-[18px] flex justify-between border-b border-[#E4E0D7] pb-4">
              <Skeleton className="h-8 w-28" />
              <Skeleton className="h-4 w-32" />
            </div>
            <div className="mt-3 flex gap-3">
              <Skeleton className="h-[51px] flex-1 rounded-[12px]" />
              <Skeleton className="h-[51px] flex-1 rounded-[12px]" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BatchSuccessSkeleton;
