"use client";

import { useArtistsCollectorsStatsProvider } from "@/providers/ArtistsCollectorsStatsProvider";
import AnalyticsPeriodSelect from "./AnalyticsPeriodSelect";

const ArtistsCollectorsStatsPeriodSelect = () => {
  const { period, applyPeriod } = useArtistsCollectorsStatsProvider();

  return <AnalyticsPeriodSelect value={period} onChange={applyPeriod} />;
};

export default ArtistsCollectorsStatsPeriodSelect;
