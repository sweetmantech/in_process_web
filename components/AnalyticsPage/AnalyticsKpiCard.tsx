import { Skeleton } from "@/components/ui/skeleton";
import formatAnalyticsDeltaPct from "@/lib/stats/formatAnalyticsDeltaPct";
import type { AnalyticsStatMetric } from "@/types/analyticsStats";

type Props = {
  label: string;
  metric?: AnalyticsStatMetric;
  loading: boolean;
};

const getDeltaColor = (deltaPct: number) => {
  if (deltaPct > 0) return "text-[#3F8A54]";
  if (deltaPct < 0) return "text-[#B3543F]";
  return "text-[#B6B2A8]";
};

const AnalyticsKpiCard = ({ label, metric, loading }: Props) => {
  const deltaLabel =
    metric?.delta_pct !== null && metric?.delta_pct !== undefined
      ? formatAnalyticsDeltaPct(metric.delta_pct)
      : null;

  return (
    <div className="bg-white px-5 py-[18px] md:px-[22px]">
      <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.13em] text-[#6B6456]">
        {label}
      </div>
      <div className="flex items-baseline gap-2.5">
        <div className="font-spectral-medium text-[32px] leading-none tracking-[-0.02em] text-[#1c1a17] md:text-[38px]">
          {loading || !metric ? (
            <Skeleton className="h-9 w-16" />
          ) : (
            metric.value.toLocaleString("en-US")
          )}
        </div>
        {deltaLabel && metric ? (
          <span className={`text-sm font-medium ${getDeltaColor(metric.delta_pct ?? 0)}`}>
            {deltaLabel}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default AnalyticsKpiCard;
