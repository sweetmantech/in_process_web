"use client";

import { CircleDot } from "lucide-react";
import useMomentActionCard from "@/hooks/useMomentActionCard";
import { MOBILE_CREATE_FAB_GUTTER_PX, mobileFooterBottomStyle } from "@/lib/layout/mobileFooter";

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
    <div
      className="fixed left-0 right-0 z-[55] flex items-center border-t border-[#E4E0D7] bg-white px-[18px] py-2.5 md:hidden"
      style={mobileFooterBottomStyle}
    >
      <div className="flex min-w-0 flex-1 items-center justify-start pr-1">
        {priceLabel && (
          <div className="flex min-w-0 flex-col justify-center">
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
      </div>

      <div className="shrink-0" style={{ width: MOBILE_CREATE_FAB_GUTTER_PX }} aria-hidden />

      <div className="flex min-w-0 flex-1 items-center justify-end pl-1">
        <button
          type="button"
          onClick={handleCollect}
          disabled={isCollectDisabled}
          className="flex w-full min-w-0 items-center justify-center gap-1.5 rounded-[11px] bg-grey-moss-900 px-3 py-3 font-archivo-medium text-sm text-white transition-colors hover:bg-black disabled:cursor-not-allowed disabled:bg-[#C7C1B4] disabled:text-[#F1EEE8]"
        >
          <CircleDot className="size-4 shrink-0" strokeWidth={1.75} />
          <span className="truncate">{collectCtaLabel}</span>
        </button>
      </div>
    </div>
  );
};

export default MomentCollectBar;
