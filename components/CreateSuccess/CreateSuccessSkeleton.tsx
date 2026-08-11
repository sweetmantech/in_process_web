import { Skeleton } from "@/components/ui/skeleton";

const CreateSuccessSkeleton = () => {
  return (
    <>
      <div className="mt-4">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="mt-3 h-4 w-full max-w-[360px]" />
        <Skeleton className="mt-2 h-4 w-3/4 max-w-[280px]" />
      </div>

      <div className="mt-5 flex items-baseline justify-between gap-4 border-b border-[#E4E0D7] pb-[18px]">
        <Skeleton className="h-8 w-28" />
        <Skeleton className="h-4 w-32" />
      </div>

      <div className="mt-3 flex flex-col gap-3 md:flex-row">
        <Skeleton className="h-[51px] flex-1 rounded-[12px]" />
        <Skeleton className="h-[51px] flex-1 rounded-[12px]" />
      </div>

      <div className="mt-7 rounded-[16px] border border-[#E4E0D7] bg-white p-[22px]">
        <Skeleton className="h-3 w-16" />
        <Skeleton className="mt-4 h-12 w-full rounded-none" />
        <Skeleton className="mt-4 h-3 w-28" />
        <div className="mt-3 flex gap-2">
          <Skeleton className="h-8 w-20 rounded-full" />
          <Skeleton className="h-8 w-24 rounded-full" />
          <Skeleton className="h-8 w-14 rounded-full" />
        </div>
        <Skeleton className="mt-4 h-12 w-full rounded-full" />
      </div>
    </>
  );
};

export default CreateSuccessSkeleton;
