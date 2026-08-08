"use client";

import {
  CHAIN_FILTER_TABS,
  CONTENT_TYPE_FILTER_TABS,
  PERIOD_FILTER_TABS,
  PROTOCOL_FILTER_TABS,
} from "@/lib/timeline/timelineFilters";
import type { ArtistFiltersProps } from "@/types/artistFilters";
import FilterSelect from "./FilterSelect";

const ArtistFilters = ({
  protocol,
  contentType,
  period,
  chain,
  onProtocolChange,
  onContentTypeChange,
  onPeriodChange,
  onChainChange,
}: ArtistFiltersProps) => {
  return (
    <div className="flex flex-wrap items-center gap-1.5">
      <FilterSelect
        label="Protocol"
        value={protocol}
        options={PROTOCOL_FILTER_TABS}
        onChange={onProtocolChange}
      />
      <FilterSelect
        label="Content"
        value={contentType}
        options={CONTENT_TYPE_FILTER_TABS}
        onChange={onContentTypeChange}
      />
      <FilterSelect
        label="Period"
        value={period}
        options={PERIOD_FILTER_TABS}
        onChange={onPeriodChange}
      />
      <FilterSelect
        label="Chain"
        value={chain}
        options={CHAIN_FILTER_TABS}
        onChange={onChainChange}
      />
    </div>
  );
};

export default ArtistFilters;
