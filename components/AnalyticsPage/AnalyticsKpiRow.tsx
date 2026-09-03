"use client";

import AnalyticsKpiCard from "./AnalyticsKpiCard";
import { useAnalyticsProvider } from "@/providers/AnalyticsProvider";
import type { AnalyticsKpiKey } from "@/types/analyticsStats";

const KPI_ITEMS: { key: AnalyticsKpiKey; label: string }[] = [
  { key: "moments_created", label: "Moments Created" },
  { key: "moments_airdropped", label: "Moments Airdropped" },
  { key: "moments_collected", label: "Moments Collected" },
  { key: "active_artists", label: "Active Artists" },
  { key: "collectors", label: "Collectors" },
  { key: "artists_collectors", label: "Artists & Collectors" },
];

const AnalyticsKpiRow = () => {
  const {
    stats: { data, isLoading, error },
  } = useAnalyticsProvider();

  return (
    <div>
      {error ? <p className="mb-3 text-sm text-red-500">Error loading analytics stats</p> : null}
      <div className="grid grid-cols-3 gap-px overflow-hidden rounded-[10px] border border-[#E4E0D7] bg-[#E4E0D7]">
        {KPI_ITEMS.map(({ key, label }) => (
          <AnalyticsKpiCard key={key} label={label} metric={data?.[key]} loading={isLoading} />
        ))}
      </div>
    </div>
  );
};

export default AnalyticsKpiRow;
