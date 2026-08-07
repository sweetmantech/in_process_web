"use client";

import type { ReactNode } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Clock3, FileText, Hexagon, Layers } from "lucide-react";
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

const triggerClassName =
  "h-auto min-h-9 w-auto gap-2 rounded-full border-[rgba(28,26,23,0.14)] bg-white px-3.5 py-2 font-archivo text-[13px] text-[#1c1a17] shadow-none focus:ring-0";

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
  const selected = options.find((option) => option.label === value);

  return (
    <Select value={value} onValueChange={(v) => onChange(v as T)}>
      <SelectTrigger className={triggerClassName}>
        <span className="flex items-center gap-2">
          <span className="text-[#8a8578]">{icon}</span>
          <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[#8a8578]">
            {label}
          </span>
          <span className="text-[#1c1a17]">{selected?.displayLabel ?? value}</span>
          <SelectValue className="sr-only" />
        </span>
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.label} value={option.label}>
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
        icon={<Layers className="size-3.5" strokeWidth={1.75} />}
        value={protocol}
        options={PROTOCOL_FILTER_TABS}
        onChange={onProtocolChange}
      />
      <FilterSelect
        label="Type"
        icon={<FileText className="size-3.5" strokeWidth={1.75} />}
        value={contentType}
        options={CONTENT_TYPE_FILTER_TABS}
        onChange={onContentTypeChange}
      />
      <FilterSelect
        label="Time"
        icon={<Clock3 className="size-3.5" strokeWidth={1.75} />}
        value={period}
        options={PERIOD_FILTER_TABS}
        onChange={onPeriodChange}
      />
      <FilterSelect
        label="Chain"
        icon={<Hexagon className="size-3.5" strokeWidth={1.75} />}
        value={chain}
        options={CHAIN_FILTER_TABS}
        onChange={onChainChange}
      />
    </div>
  );
};

export default ArtistFilters;
