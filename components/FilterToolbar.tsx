"use client";

import { cn } from "@/lib/utils";

export type FilterTab<T extends string = string> = {
  label: T;
  displayLabel?: string;
  count?: number;
};

type Props<T extends string> = {
  tabs: FilterTab<T>[];
  active: T;
  onChange: (value: T) => void;
};

function FilterToolbar<T extends string>({ tabs, active, onChange }: Props<T>) {
  return (
    <div className="no-scrollbar flex flex-nowrap items-center gap-2 overflow-x-auto md:flex-wrap md:overflow-visible">
      {tabs.map((tab) => {
        const isActive = tab.label === active;
        return (
          <button
            key={tab.label}
            type="button"
            onClick={() => onChange(tab.label)}
            className={cn(
              "inline-flex shrink-0 items-center gap-1.5 rounded-[20px] px-3.5 py-[7px] font-archivo text-[13px] transition-all duration-150",
              isActive
                ? "border border-[#1c1a17] bg-[#1c1a17] text-[#f4f0e6]"
                : "border border-[rgba(28,26,23,0.14)] bg-transparent text-[#1c1a17]"
            )}
          >
            {tab.displayLabel ?? tab.label}
            {tab.count != null && (
              <span
                className={cn(
                  "font-mono text-[10px]",
                  isActive ? "text-[rgba(244,240,230,0.6)]" : "text-[#a49c8c]"
                )}
              >
                {tab.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

export default FilterToolbar;
