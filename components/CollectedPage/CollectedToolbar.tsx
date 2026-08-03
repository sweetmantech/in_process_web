"use client";

import { cn } from "@/lib/utils";
import type { ContentTypeFilter } from "./types";

type Tab = { label: ContentTypeFilter; count: number };

type Props = {
  tabs: Tab[];
  active: ContentTypeFilter;
  onChange: (type: ContentTypeFilter) => void;
  resultCount: string;
  dense: boolean;
  onDense: () => void;
  onGrid: () => void;
};

const CollectedToolbar = ({
  tabs,
  active,
  onChange,
  resultCount,
  dense,
  onDense,
  onGrid,
}: Props) => {
  return (
    <div className="mb-4 flex flex-wrap items-center justify-between gap-[9px]">
      <div className="flex flex-wrap items-center gap-2">
        {tabs.map((tab) => {
          const isActive = tab.label === active;
          return (
            <button
              key={tab.label}
              type="button"
              onClick={() => onChange(tab.label)}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-[20px] px-3.5 py-[7px] font-archivo text-[13px] transition-all duration-150",
                isActive
                  ? "border border-[#1c1a17] bg-[#1c1a17] text-[#f4f0e6]"
                  : "border border-[rgba(28,26,23,0.14)] bg-transparent text-[#1c1a17]"
              )}
            >
              {tab.label}
              <span
                className={cn(
                  "font-mono text-[10px]",
                  isActive ? "text-[rgba(244,240,230,0.6)]" : "text-[#a49c8c]"
                )}
              >
                {tab.count}
              </span>
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-4">
        <div className="whitespace-nowrap font-mono text-[11px] tracking-[0.06em] text-[#8a8578]">
          {resultCount}
        </div>
        <div className="flex gap-0.5 rounded-lg border border-[rgba(28,26,23,0.14)] bg-[#fffdf6] p-[3px]">
          <button
            type="button"
            onClick={onDense}
            aria-label="Dense grid"
            className={cn(
              "flex h-[26px] w-[30px] items-center justify-center rounded-md text-[13px]",
              dense ? "bg-[#1c1a17] text-[#f4f0e6]" : "bg-transparent text-[#8a8578]"
            )}
          >
            ☰
          </button>
          <button
            type="button"
            onClick={onGrid}
            aria-label="Comfortable grid"
            className={cn(
              "flex h-[26px] w-[30px] items-center justify-center rounded-md text-[13px]",
              !dense ? "bg-[#1c1a17] text-[#f4f0e6]" : "bg-transparent text-[#8a8578]"
            )}
          >
            ▦
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollectedToolbar;
