"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { buildChartData } from "@/lib/analytics/buildChartData";
import { useAnalyticsProvider } from "@/providers/AnalyticsProvider";
import { useTimelineProvider } from "@/providers/TimelineProvider";
import { useEffect, useMemo } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CREATED_COLOR = "#887bff";

type TooltipPayload = {
  payload?: {
    label?: string;
    created?: number;
  };
};

const ChartTooltip = ({
  active,
  payload,
}: {
  active?: boolean;
  payload?: TooltipPayload[];
}) => {
  if (!active || !payload?.length) return null;
  const point = payload[0]?.payload;
  if (!point) return null;

  return (
    <div className="rounded-md border border-[#E4E0D7] bg-white px-2.5 py-1.5 text-xs font-semibold text-[#1B1504] shadow-sm">
      {point.created ?? 0} created
      <span className="ml-1.5 font-normal text-[#6B6456]">{point.label}</span>
    </div>
  );
};

const MomentsTimelineChart = () => {
  const { filters, stats } = useAnalyticsProvider();
  const { moments, isLoading, hasNextPage, isFetchingNextPage, fetchMore } = useTimelineProvider();

  useEffect(() => {
    if (filters.period === "all") return;
    if (hasNextPage && !isFetchingNextPage) {
      fetchMore();
    }
  }, [filters.period, hasNextPage, isFetchingNextPage, fetchMore]);

  const data = useMemo(
    () => buildChartData(moments, filters.period),
    [moments, filters.period]
  );

  const chartTotal =
    stats.data?.moments_created.value ?? data.reduce((sum, point) => sum + point.created, 0);

  if (isLoading && moments.length === 0) {
    return (
      <div className="rounded-[10px] border border-[#E4E0D7] bg-white px-6 pb-3 pt-[22px]">
        <Skeleton className="mb-1.5 h-3 w-36" />
        <Skeleton className="mb-4 h-8 w-48" />
        <Skeleton className="h-[210px] w-full" />
      </div>
    );
  }

  return (
    <div className="rounded-[10px] border border-[#E4E0D7] bg-white px-6 pb-3 pt-[22px]">
      <div className="mb-1.5 flex items-start justify-between gap-5">
        <div>
          <div className="mb-1.5 text-[10.5px] font-medium uppercase tracking-[0.13em] text-[#6B6456]">
            moments over time
          </div>
          <div className="flex items-baseline gap-2.5">
            <span className="font-spectral text-[32px] leading-none tabular-nums text-[#1B1504]">
              {chartTotal.toLocaleString("en-US")}
            </span>
            <span className="text-[13px] text-[#6B6456]">moments minted</span>
          </div>
        </div>
        <div className="flex gap-4 pt-1">
          <div className="flex items-center gap-1.5 text-xs text-[#6B6456]">
            <span className="size-[9px] rounded-sm bg-[#887bff]" />
            created
          </div>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={210}>
        <AreaChart data={data} margin={{ top: 10, right: 8, left: 0, bottom: 0 }}>
          <defs>
            <linearGradient id="analyticsCreatedFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={CREATED_COLOR} stopOpacity={0.22} />
              <stop offset="100%" stopColor={CREATED_COLOR} stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="#EDEAE2" strokeDasharray="0" />
          <XAxis
            dataKey="label"
            tick={{ fontSize: 10.5, fill: "#B6B2A8" }}
            tickLine={false}
            axisLine={false}
            interval="preserveStartEnd"
            minTickGap={28}
          />
          <YAxis
            allowDecimals={false}
            width={34}
            tick={{ fontSize: 10.5, fill: "#B6B2A8" }}
            tickLine={false}
            axisLine={false}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: "#B6B2A8", strokeDasharray: "3 3" }} />
          <Area
            type="monotone"
            dataKey="created"
            stroke={CREATED_COLOR}
            strokeWidth={2.2}
            fill="url(#analyticsCreatedFill)"
            activeDot={{ r: 4.5, strokeWidth: 2, stroke: CREATED_COLOR, fill: "#fff" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MomentsTimelineChart;
