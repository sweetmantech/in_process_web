import { Skeleton } from "@/components/ui/skeleton";

interface MomentCountProps {
  totalCount: number | undefined;
  todayCount: number;
}

const MomentCount = ({ totalCount, todayCount }: MomentCountProps) => {
  return (
    <div className="flex items-center gap-3.5">
      <span className="font-archivo-bold text-[34px] leading-none tracking-[-0.02em] text-grey-moss-900">
        {totalCount !== undefined ? (
          totalCount.toLocaleString()
        ) : (
          <Skeleton className="inline-block h-8 w-16 align-middle" />
        )}
      </span>
      <div className="flex flex-col gap-px leading-[1.15]">
        <span className="font-archivo text-[11px] uppercase tracking-[0.1em] text-grey-moss-300">
          moments
        </span>
        {todayCount > 0 && (
          <span className="font-archivo-medium inline-flex items-center gap-1.5 text-xs text-grey-moss-900">
            <span
              className="h-1.5 w-1.5 rounded-full bg-tan"
              style={{ boxShadow: "0 0 8px rgba(253,173,0,.8)" }}
            />
            {todayCount} new today
          </span>
        )}
      </div>
    </div>
  );
};

export default MomentCount;
