"use client";

import { useCollectors } from "@/hooks/useCollectors";
import { AnalyticsPeriod } from "@/types/timeline";
import { createContext, useContext, useMemo, type ReactNode } from "react";

type CollectorsContextValue = ReturnType<typeof useCollectors>;

const CollectorsContext = createContext<CollectorsContextValue | null>(null);

export const CollectorsProvider = ({
  children,
  limit = 10,
  period,
  artist,
}: {
  children: ReactNode;
  limit?: number;
  period?: AnalyticsPeriod;
  artist?: string;
}) => {
  const collectors = useCollectors({ limit, period, artist });

  const value = useMemo(() => collectors, [collectors]);

  return <CollectorsContext.Provider value={value}>{children}</CollectorsContext.Provider>;
};

export const useCollectorsProvider = () => {
  const context = useContext(CollectorsContext);
  if (!context) {
    throw new Error("useCollectorsProvider must be used within a CollectorsProvider");
  }
  return context;
};

export default CollectorsProvider;
