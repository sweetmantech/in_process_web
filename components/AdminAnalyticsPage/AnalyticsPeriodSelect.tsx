"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnalyticsPeriod } from "@/types/timeline";

interface AnalyticsPeriodSelectProps {
  value: AnalyticsPeriod | undefined;
  onChange: (period: AnalyticsPeriod | undefined) => void;
  className?: string;
}

const AnalyticsPeriodSelect = ({
  value,
  onChange,
  className = "h-7 w-28 text-xs",
}: AnalyticsPeriodSelectProps) => {
  return (
    <Select
      value={value ?? "all"}
      onValueChange={(v) => onChange(v === "all" ? undefined : (v as AnalyticsPeriod))}
    >
      <SelectTrigger className={className}>
        <SelectValue placeholder="Period" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="all">All time</SelectItem>
        <SelectItem value="day">Last 24h</SelectItem>
        <SelectItem value="week">Last 7 days</SelectItem>
        <SelectItem value="month">Last 30 days</SelectItem>
      </SelectContent>
    </Select>
  );
};

export default AnalyticsPeriodSelect;
