import type { AnalyticsPeriod } from "@/types/timeline";

export type AnalyticsChartPoint = {
  date: string;
  label: string;
  created: number;
};

const DAY_MS = 24 * 60 * 60 * 1000;

const formatDayLabel = (isoDate: string) => {
  const date = new Date(`${isoDate}T12:00:00.000Z`);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    timeZone: "UTC",
  });
};

const toUtcDayKey = (date: Date) => date.toISOString().slice(0, 10);

const startOfUtcDay = (date = new Date()) => {
  const copy = new Date(date);
  copy.setUTCHours(0, 0, 0, 0);
  return copy;
};

const periodDayCount = (period?: AnalyticsPeriod) => {
  if (period === "day") return 1;
  if (period === "week") return 7;
  if (period === "month") return 30;
  return 30;
};

export const buildChartData = (
  moments: { created_at: string }[],
  period?: AnalyticsPeriod
): AnalyticsChartPoint[] => {
  const counts: Record<string, number> = {};
  for (const moment of moments) {
    const day = moment.created_at.slice(0, 10);
    counts[day] = (counts[day] ?? 0) + 1;
  }

  const dayCount = periodDayCount(period);
  const end = startOfUtcDay();
  const points: AnalyticsChartPoint[] = [];

  for (let offset = dayCount - 1; offset >= 0; offset -= 1) {
    const day = new Date(end.getTime() - offset * DAY_MS);
    const key = toUtcDayKey(day);
    points.push({
      date: key,
      label: formatDayLabel(key),
      created: counts[key] ?? 0,
    });
  }

  return points;
};
