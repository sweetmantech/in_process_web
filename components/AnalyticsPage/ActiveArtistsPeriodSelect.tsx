"use client";

import { useActiveArtistsProvider } from "@/providers/ActiveArtistsProvider";
import AnalyticsPeriodSelect from "./AnalyticsPeriodSelect";

const ActiveArtistsPeriodSelect = () => {
  const { period, applyPeriod } = useActiveArtistsProvider();

  return <AnalyticsPeriodSelect value={period} onChange={applyPeriod} />;
};

export default ActiveArtistsPeriodSelect;
