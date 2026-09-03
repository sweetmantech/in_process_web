"use client";

import { useAnalyticsProvider } from "@/providers/AnalyticsProvider";
import AnalyticsArtistSearchInput from "./AnalyticsArtistSearchInput";
import AnalyticsPeriodPills, { analyticsPeriodCaption } from "./AnalyticsPeriodPills";

const AnalyticsHeader = () => {
  const { filters, patchFilters } = useAnalyticsProvider();

  return (
    <div className="mb-[30px] flex flex-wrap items-end justify-between gap-6">
      <div>
        <h1 className="mb-1.5 font-spectral text-[40px] font-normal leading-none tracking-[-0.025em] text-[#1B1504] md:text-[52px]">
          Analytics
        </h1>
        <div className="font-spectral-italic text-[15.5px] text-[#6B6456]">
          {analyticsPeriodCaption(filters.period)}
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <AnalyticsArtistSearchInput
          onChanged={(value) => patchFilters({ artist: value })}
          placeholder="Artist name or address"
          iconPosition="left"
        />
        <AnalyticsPeriodPills
          value={filters.period}
          onChange={(period) => patchFilters({ period })}
        />
      </div>
    </div>
  );
};

export default AnalyticsHeader;
