"use client";

import { useArweaveUploads } from "@/hooks/useArweaveUploads";
import { AnalyticsPeriod } from "@/types/timeline";
import { createContext, useContext, useMemo, type ReactNode } from "react";

type ArweaveUploadsContextValue = ReturnType<typeof useArweaveUploads>;

const ArweaveUploadsContext = createContext<ArweaveUploadsContextValue | null>(null);

export const ArweaveUploadsProvider = ({
  children,
  aggregation,
  period,
  artist,
}: {
  children: ReactNode;
  aggregation: boolean;
  period?: AnalyticsPeriod;
  artist?: string;
}) => {
  const arweaveUploads = useArweaveUploads({ aggregation, period, artist });

  const value = useMemo(() => arweaveUploads, [arweaveUploads]);

  return <ArweaveUploadsContext.Provider value={value}>{children}</ArweaveUploadsContext.Provider>;
};

export const useArweaveUploadsProvider = () => {
  const context = useContext(ArweaveUploadsContext);
  if (!context) {
    throw new Error("useArweaveUploadsProvider must be used within an ArweaveUploadsProvider");
  }
  return context;
};

export default ArweaveUploadsProvider;
