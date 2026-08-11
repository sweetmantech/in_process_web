"use client";

import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import useCurrencySelect from "@/hooks/useCurrencySelect";

export default function CurrencySelect() {
  const { disabled, open, rootRef, priceUnit, current, options, toggleOpen, selectCurrency } =
    useCurrencySelect();

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        disabled={disabled}
        onClick={toggleOpen}
        className="inline-flex items-center gap-1.5 rounded-[9px] border border-[#DCD6CA] bg-white px-2.5 py-1.5 font-archivo-bold text-[13px] text-grey-moss-900 disabled:opacity-50"
      >
        {current.label}
        <ChevronDown className="size-3.5 text-[#A8A296]" strokeWidth={1.75} />
      </button>
      {open && (
        <div className="absolute right-0 top-[38px] z-30 w-24 rounded-[10px] border border-[#E4E0D7] bg-white p-1 shadow-[0_16px_34px_-14px_rgba(27,21,4,0.32)]">
          {options.map((option) => {
            const selected = option.value === priceUnit;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => selectCurrency(option.value)}
                className={cn(
                  "w-full rounded-[7px] px-2.5 py-2 text-left font-archivo-medium text-[13px]",
                  selected ? "bg-[#2F6BFF] text-white" : "text-grey-moss-900 hover:bg-[#F6F4EF]"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
