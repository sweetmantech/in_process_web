import { Skeleton } from "@/components/ui/skeleton";
import { CARD_CLASS } from "@/lib/utils/classNames";

const MomentPageSkeleton = () => {
  return (
    <div className="mx-auto w-full max-w-[1080px] px-[18px] pb-[88px] pt-2 md:px-10 md:pb-20">
      <Skeleton className="h-4 w-48" />

      <div className="mt-3 flex flex-col gap-4 md:flex-row md:items-start md:gap-10">
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex flex-col md:gap-4">
            <div className="order-2 space-y-2.5 md:order-1">
              <Skeleton className="mt-4 h-7 w-3/4 md:mt-0 md:h-8" />
              <Skeleton className="h-4 w-full max-w-[420px]" />
              <Skeleton className="h-4 w-2/3 max-w-[320px]" />
            </div>
            <div className="order-1 md:order-2">
              <Skeleton className="aspect-[5/4] w-full rounded-[12px] md:max-w-[520px]" />
            </div>
          </div>

          <div className="mt-[18px] space-y-3 bg-white p-4 md:hidden">
            <div className="flex gap-3 border-b border-[#DDD8CC] pb-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="h-14 w-full rounded-lg" />
          </div>
        </div>

        <div className="hidden w-full shrink-0 flex-col gap-4 md:sticky md:top-24 md:flex md:w-[340px]">
          <div className={CARD_CLASS}>
            <Skeleton className="h-4 w-28" />
            <Skeleton className="mt-4 h-10 w-24" />
            <Skeleton className="mt-4 h-12 w-full rounded-full" />
            <div className="mt-5 flex gap-2">
              <Skeleton className="h-10 flex-1 rounded-[20px]" />
              <Skeleton className="h-10 flex-1 rounded-[20px]" />
            </div>
          </div>
          <div className="overflow-hidden rounded-[10px] border border-[#E4E0D7] bg-white p-4 shadow-[0_4px_16px_-6px_rgba(27,21,4,.14)]">
            <div className="mb-3 flex gap-3 border-b border-[#DDD8CC] pb-3">
              <Skeleton className="h-3 w-20" />
              <Skeleton className="h-3 w-24" />
            </div>
            <Skeleton className="h-14 w-full rounded-lg" />
            <Skeleton className="mt-3 h-14 w-full rounded-lg" />
          </div>
        </div>
      </div>

      <div className="fixed bottom-[calc(74px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[55] flex items-center gap-3 border-t border-[#E4E0D7] bg-white px-[18px] py-2.5 md:hidden">
        <Skeleton className="h-6 w-16" />
        <Skeleton className="h-11 flex-1 rounded-[11px]" />
      </div>
    </div>
  );
};

export default MomentPageSkeleton;
