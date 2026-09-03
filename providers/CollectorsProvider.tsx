"use client";

import { useCollectors } from "@/hooks/useCollectors";
import { useAnalyticsProvider } from "@/providers/AnalyticsProvider";
import { createContext, useContext, useMemo, type ReactNode } from "react";

type CollectorsContextValue = ReturnType<typeof useCollectors>;

const CollectorsContext = createContext<CollectorsContextValue | null>(null);

export const CollectorsProvider = ({
  children,
  limit = 10,
}: {
  children: ReactNode;
  limit?: number;
}) => {
  const { filters } = useAnalyticsProvider();
  const collectors = useCollectors({
    limit,
    period: filters.period,
    artist: filters.artist,
  });

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
