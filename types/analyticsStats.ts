export type AnalyticsStatsPeriod = "day" | "week" | "month" | "all";

export type AnalyticsStatMetric = {
  value: number;
  prev: number | null;
  delta_pct: number | null;
};

export type AnalyticsStats = {
  period: AnalyticsStatsPeriod;
  moments_created: AnalyticsStatMetric;
  moments_airdropped: AnalyticsStatMetric;
  moments_collected: AnalyticsStatMetric;
  active_artists: AnalyticsStatMetric;
  collectors: AnalyticsStatMetric;
  artists_collectors: AnalyticsStatMetric;
};

export type AnalyticsKpiKey = keyof Omit<AnalyticsStats, "period">;
