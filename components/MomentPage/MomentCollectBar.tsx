"use client";

import { CircleDot } from "lucide-react";
import useMomentActionCard from "@/hooks/useMomentActionCard";

const MomentCollectBar = () => {
  const {
    isLoading,
    metadata,
    priceLabel,
    priceUnit,
    isCollectDisabled,
    collectCtaLabel,
    handleCollect,
  } = useMomentActionCard();

  if (isLoading || !metadata) return null;

  return (
    <div className="fixed bottom-[calc(74px+env(safe-area-inset-bottom,0px))] left-0 right-0 z-[55] flex items-center justify-around gap-3 border-t border-[#E4E0D7] bg-white px-[18px] py-2.5 md:hidden">
      {priceLabel && (
        <div className="flex min-w-[4.5rem] max-w-[calc(50%-2.75rem)] shrink-0 flex-col justify-center">
          <div className="flex min-w-0 items-baseline gap-1">
            <span className="truncate font-['Archivo-Bold'] text-[24px] uppercase leading-none tracking-tight text-tan-gold">
              {priceLabel}
            </span>
            {priceUnit && (
              <span className="shrink-0 font-archivo-medium text-xs uppercase text-tan-gold">
                {priceUnit}
              </span>
            )}
          </div>
        </div>
      )}
      <button
        type="button"
        onClick={handleCollect}
        disabled={isCollectDisabled}
        className="flex max-w-[calc(50%-2.75rem)] shrink-0 items-center justify-center gap-1.5 rounded-[11px] bg-grey-moss-900 px-3 py-3 font-archivo-medium text-sm text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-[#C7C1B4] disabled:text-[#F1EEE8]"
      >
        <CircleDot className="size-4 shrink-0" strokeWidth={1.75} />
        <span className="truncate">{collectCtaLabel}</span>
      </button>
    </div>
  );
};

export default MomentCollectBar;
