"use client";

import { cn } from "@/lib/utils";
import type { ContentTypeFilter } from "./types";

type Tab = { label: ContentTypeFilter; count: number };

type Props = {
  tabs: Tab[];
  active: ContentTypeFilter;
  onChange: (type: ContentTypeFilter) => void;
};

const CollectedToolbar = ({ tabs, active, onChange }: Props) => {
  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
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
  );
};

export default CollectedToolbar;
