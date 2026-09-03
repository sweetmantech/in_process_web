import { Skeleton } from "@/components/ui/skeleton";
import formatAnalyticsDeltaPct from "@/lib/stats/formatAnalyticsDeltaPct";
import type { AnalyticsStatMetric } from "@/types/analyticsStats";
import { TrendingDown, TrendingUp } from "lucide-react";

type Props = {
  label: string;
  metric?: AnalyticsStatMetric;
  loading: boolean;
};

const AnalyticsKpiCard = ({ label, metric, loading }: Props) => {
  const deltaLabel = metric ? formatAnalyticsDeltaPct(metric.delta_pct) : null;
  const showDelta = deltaLabel !== null && metric?.delta_pct !== null;
  const deltaUp = (metric?.delta_pct ?? 0) >= 0;

  return (
    <div className="bg-white px-5 py-[18px] md:px-[22px]">
      <div className="mb-3 font-mono text-[10.5px] uppercase tracking-[0.13em] text-[#6B6456]">
        {label}
      </div>
      <div className="font-spectral-medium text-[32px] leading-none tracking-[-0.02em] text-[#1c1a17] md:text-[38px]">
        {loading || !metric ? (
          <Skeleton className="h-9 w-16" />
        ) : (
          metric.value.toLocaleString("en-US")
        )}
      </div>
      {showDelta && metric && (
        <div className="mt-2.5 flex items-center gap-1.5">
          {deltaUp ? (
            <TrendingUp className="h-3.5 w-3.5 text-[#3F8A54]" />
          ) : (
            <TrendingDown className="h-3.5 w-3.5 text-[#B3543F]" />
          )}
          <span
            className={`text-xs font-semibold ${deltaUp ? "text-[#3F8A54]" : "text-[#B3543F]"}`}
          >
            {deltaLabel}
          </span>
          <span className="text-xs text-[#B6B2A8]">vs prev</span>
        </div>
      )}
    </div>
  );
};

export default AnalyticsKpiCard;
