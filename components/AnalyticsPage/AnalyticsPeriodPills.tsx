"use client";

import type { AnalyticsPeriod } from "@/types/timeline";

const PERIOD_OPTIONS: { value: AnalyticsPeriod; label: string }[] = [
  { value: "week", label: "Last 7 days" },
  { value: "month", label: "Last 30 days" },
  { value: "all", label: "All time" },
];

type Props = {
  value: AnalyticsPeriod | undefined;
  onChange: (period: AnalyticsPeriod) => void;
};

const AnalyticsPeriodPills = ({ value, onChange }: Props) => {
  const selected = value ?? "all";

  return (
    <div className="flex flex-wrap items-center gap-2">
      {PERIOD_OPTIONS.map(({ value: period, label }) => {
        const active = selected === period;
        return (
          <button
            key={period}
            type="button"
            onClick={() => onChange(period)}
            className={`rounded-[20px] border px-[15px] py-2 text-[12.5px] font-semibold transition-colors ${
              active
                ? "border-[#1B1504] bg-[#1B1504] text-white"
                : "border-[#E4E0D7] bg-white text-[#6B6456] hover:border-[#1B1504] hover:text-[#1B1504]"
            }`}
          >
            {label}
          </button>
        );
      })}
    </div>
  );
};

export default AnalyticsPeriodPills;

export const analyticsPeriodCaption = (period: AnalyticsPeriod | undefined) => {
  const selected = period ?? "all";
  const label = PERIOD_OPTIONS.find((option) => option.value === selected)?.label ?? "All time";
  return `${label.toLowerCase()} · updated just now`;
};
