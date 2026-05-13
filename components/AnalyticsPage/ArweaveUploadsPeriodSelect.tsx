"use client";

import { useArweaveUploadsProvider } from "@/providers/ArweaveUploadsProvider";
import AnalyticsPeriodSelect from "./AnalyticsPeriodSelect";

const ArweaveUploadsPeriodSelect = () => {
  const { period, applyPeriod } = useArweaveUploadsProvider();

  return <AnalyticsPeriodSelect value={period} onChange={applyPeriod} />;
};

export default ArweaveUploadsPeriodSelect;
