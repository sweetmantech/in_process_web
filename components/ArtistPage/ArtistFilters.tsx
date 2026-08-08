"use client";

import type { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  CHAIN_FILTER_TABS,
  CONTENT_TYPE_FILTER_TABS,
  PERIOD_FILTER_TABS,
  PROTOCOL_FILTER_TABS,
  type ChainFilter,
  type ContentTypeFilter,
  type PeriodFilter,
  type ProtocolFilter,
} from "@/lib/timeline/timelineFilters";

type Props = {
  protocol: ProtocolFilter;
  contentType: ContentTypeFilter;
  period: PeriodFilter;
  chain: ChainFilter;
  onProtocolChange: (value: ProtocolFilter) => void;
  onContentTypeChange: (value: ContentTypeFilter) => void;
  onPeriodChange: (value: PeriodFilter) => void;
  onChainChange: (value: ChainFilter) => void;
};

type FilterSelectProps<T extends string> = {
  label: string;
  icon: ReactNode;
  value: T;
  options: { label: T; displayLabel: string }[];
  onChange: (value: T) => void;
};

function FilterSelect<T extends string>({
  label,
  icon,
  value,
  options,
  onChange,
}: FilterSelectProps<T>) {
  const isActive = value !== "All";

  return (
    <Select value={value} onValueChange={(v) => onChange(v as T)}>
      <SelectTrigger
        className={cn(
          "h-auto w-auto gap-[9px] rounded-[15px] border px-[13px] py-[7px] font-spectral text-left shadow-none transition-all duration-150 focus:ring-0 focus:ring-offset-0 [&>span]:line-clamp-none",
          "[&_svg]:size-[15px] [&_svg]:shrink-0 [&_svg]:opacity-65 [&_svg]:transition-transform [&[data-state=open]_svg]:rotate-180",
          isActive
            ? "border-[#c05a2a] bg-[#c05a2a] text-white"
            : "border-[#efece4] bg-[#efece4] text-[#1a1a18] data-[state=open]:border-[#1a1a18]"
        )}
      >
        <span className="flex items-center gap-[9px]">
          <span className="text-[15px] leading-none">{icon}</span>
          <span className="flex flex-col items-start text-[15.5px] font-medium leading-[1.15]">
            <span
              className={cn(
                "font-mono text-[9.5px] font-normal uppercase tracking-[1px]",
                isActive ? "text-white/70" : "text-[#9a978e]"
              )}
            >
              {label}
            </span>
            <SelectValue />
          </span>
        </span>
      </SelectTrigger>
      <SelectContent
        className="min-w-[180px] rounded-[14px] border border-[#ddd8cd] bg-[#fbfaf7] p-1.5 shadow-[0_14px_34px_rgba(30,26,18,0.16)]"
        position="popper"
      >
        {options.map((option) => (
          <SelectItem
            key={option.label}
            value={option.label}
            className="cursor-pointer rounded-[9px] py-[9px] pl-3 pr-8 text-[15.5px] text-[#1a1a18] focus:bg-[#efece4] focus:text-[#1a1a18] data-[highlighted]:bg-[#efece4] data-[state=checked]:bg-[#efece4] data-[state=checked]:font-medium"
          >
            {option.displayLabel}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

const ArtistFilters = ({
  protocol,
  contentType,
  period,
  chain,
  onProtocolChange,
  onContentTypeChange,
  onPeriodChange,
  onChainChange,
}: Props) => {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <FilterSelect
        label="Source"
        icon="◇"
        value={protocol}
        options={PROTOCOL_FILTER_TABS}
        onChange={onProtocolChange}
      />
      <FilterSelect
        label="Type"
        icon="▤"
        value={contentType}
        options={CONTENT_TYPE_FILTER_TABS}
        onChange={onContentTypeChange}
      />
      <FilterSelect
        label="Time"
        icon="◷"
        value={period}
        options={PERIOD_FILTER_TABS}
        onChange={onPeriodChange}
      />
      <FilterSelect
        label="Chain"
        icon="⬡"
        value={chain}
        options={CHAIN_FILTER_TABS}
        onChange={onChainChange}
      />
    </div>
  );
};

export default ArtistFilters;
