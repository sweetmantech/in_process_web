"use client";

import { useCollectorsProvider } from "@/providers/CollectorsProvider";
import AnalyticsPeriodSelect from "./AnalyticsPeriodSelect";

const CollectorsPeriodSelect = () => {
  const { period, applyPeriod } = useCollectorsProvider();

  return <AnalyticsPeriodSelect value={period} onChange={applyPeriod} />;
};

export default CollectorsPeriodSelect;
