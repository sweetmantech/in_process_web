import { CircleDot } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

interface MobileHeroProps {
  totalCount: number | undefined;
  todayCount: number;
  onCreateClick: () => void;
}

const MobileHero = ({ totalCount, todayCount, onCreateClick }: MobileHeroProps) => (
  <div className="relative flex flex-col px-[22px] pb-4 pt-[22px]">
    <div>
      <div className="font-spectral-italic text-[30px] leading-[1.05] text-grey-moss-900">
        a collective timeline
        <br />
        for artists
      </div>
      <div className="mt-[9px] flex items-center gap-3">
        <span className="font-archivo-bold text-[34px] leading-none tracking-tight text-grey-moss-900">
          {totalCount !== undefined ? (
            totalCount.toLocaleString()
          ) : (
            <Skeleton className="inline-block h-7 w-16 align-middle" />
          )}
        </span>
        <div className="flex flex-col">
          <span className="font-archivo text-[10.5px] uppercase tracking-widest text-grey-primary">
            moments
          </span>
          {todayCount > 0 && (
            <span className="font-archivo-medium flex items-center gap-[5px] text-[11px] text-grey-moss-900">
              <span className="h-[6px] w-[6px] rounded-full bg-tan shadow-[0_0_8px_rgba(253,173,0,.8)]" />
              {todayCount} new today
            </span>
          )}
        </div>
        <button
          type="button"
          onClick={onCreateClick}
          className="ml-auto flex items-center gap-[5px] rounded-[10px] bg-grey-moss-900 py-2 pl-[11px] pr-[14px] font-archivo-medium text-[13px] text-white active:opacity-80"
        >
          <CircleDot className="h-[15px] w-[15px]" strokeWidth={1.75} />
          create
        </button>
      </div>
    </div>
  </div>
);

export default MobileHero;
