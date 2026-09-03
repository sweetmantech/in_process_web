"use client";

import { useAnalyticsStats } from "@/hooks/useAnalyticsStats";
import type { AnalyticsTableTabId } from "@/types/analyticsStats";
import type { AnalyticsFilters } from "@/types/timeline";
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";

type TabCounts = Partial<Record<AnalyticsTableTabId, number>>;

interface AnalyticsContextValue {
  filters: AnalyticsFilters;
  setFilters: (filters: AnalyticsFilters) => void;
  patchFilters: (patch: Partial<AnalyticsFilters>) => void;
  activeTab: AnalyticsTableTabId;
  setActiveTab: (tab: AnalyticsTableTabId) => void;
  tabCounts: TabCounts;
  stats: ReturnType<typeof useAnalyticsStats>;
}

const AnalyticsContext = createContext<AnalyticsContextValue | null>(null);

export const AnalyticsProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<AnalyticsFilters>({ period: "week" });
  const [activeTab, setActiveTab] = useState<AnalyticsTableTabId>("active-artists");

  const patchFilters = useCallback((patch: Partial<AnalyticsFilters>) => {
    setFilters((prev) => ({ ...prev, ...patch }));
  }, []);

  const stats = useAnalyticsStats({
    period: filters.period,
    artist: filters.artist,
  });

  const tabCounts = useMemo(
    (): TabCounts => ({
      "active-artists": stats.data?.active_artists.value,
      collectors: stats.data?.collectors.value,
      "artists-collectors": stats.data?.artists_collectors.value,
    }),
    [stats.data]
  );

  const value = useMemo(
    (): AnalyticsContextValue => ({
      filters,
      setFilters,
      patchFilters,
      activeTab,
      setActiveTab,
      tabCounts,
      stats,
    }),
    [filters, patchFilters, activeTab, tabCounts, stats]
  );

  return <AnalyticsContext.Provider value={value}>{children}</AnalyticsContext.Provider>;
};

export const useAnalyticsProvider = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalyticsProvider must be used within an AnalyticsProvider");
  }
  return context;
};

export default AnalyticsProvider;
