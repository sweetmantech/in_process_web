import type { AnalyticsStatsPeriod } from "@/types/analyticsStats";
import type { AnalyticsPeriod } from "@/types/timeline";

const resolveAnalyticsStatsPeriod = (
  period?: AnalyticsPeriod
): AnalyticsStatsPeriod => period ?? "all";

export default resolveAnalyticsStatsPeriod;
