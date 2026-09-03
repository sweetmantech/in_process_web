"use client";

import AnalyticsKpiCard from "./AnalyticsKpiCard";
import { useAnalyticsStats } from "@/hooks/useAnalyticsStats";
import type { AnalyticsKpiKey } from "@/types/analyticsStats";
import type { AnalyticsPeriod } from "@/types/timeline";

const KPI_ITEMS: { key: AnalyticsKpiKey; label: string }[] = [
  { key: "moments_created", label: "Moments Created" },
  { key: "moments_airdropped", label: "Moments Airdropped" },
  { key: "moments_collected", label: "Moments Collected" },
  { key: "active_artists", label: "Active Artists" },
  { key: "collectors", label: "Collectors" },
  { key: "artists_collectors", label: "Artists & Collectors" },
];

type Props = {
  period?: AnalyticsPeriod;
  artist?: string;
};

const AnalyticsKpiRow = ({ period, artist }: Props) => {
  const { data, isLoading, error } = useAnalyticsStats({ period, artist });

  return (
    <div>
      {error ? (
        <p className="mb-3 text-sm text-red-500">Error loading analytics stats</p>
      ) : null}
      <div className="grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-[#E4E0D7] bg-[#E4E0D7] md:grid-cols-3 lg:grid-cols-6">
        {KPI_ITEMS.map(({ key, label }) => (
          <AnalyticsKpiCard
            key={key}
            label={label}
            metric={data?.[key]}
            loading={isLoading}
          />
        ))}
      </div>
    </div>
  );
};

export default AnalyticsKpiRow;
