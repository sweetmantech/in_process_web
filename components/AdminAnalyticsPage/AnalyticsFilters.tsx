"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnalyticsFilters as Filters } from "@/types/timeline";
import { useState } from "react";
import AnalyticsArtistSearchInput from "./AnalyticsArtistSearchInput";
import AnalyticsPeriodSelect from "./AnalyticsPeriodSelect";

interface AnalyticsFiltersProps {
  filters: Filters;
  onChange: (filters: Filters) => void;
}

const AnalyticsFilters = ({ filters, onChange }: AnalyticsFiltersProps) => {
  const set = (patch: Partial<Filters>) => onChange({ ...filters, ...patch });

  return (
    <div className="flex flex-wrap justify-end gap-2">
      <AnalyticsArtistSearchInput
        onChanged={(value) => set({ artist: value })}
        placeholder="Artist name or address"
      />

      <AnalyticsPeriodSelect value={filters.period} onChange={(period) => set({ period })} />

      <Select
        value={filters.channel ?? "all"}
        onValueChange={(v) => set({ channel: v === "all" ? undefined : (v as Filters["channel"]) })}
      >
        <SelectTrigger className="h-7 w-28 text-xs">
          <SelectValue placeholder="Channel" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All channels</SelectItem>
          <SelectItem value="telegram">Telegram</SelectItem>
          <SelectItem value="sms">SMS</SelectItem>
          <SelectItem value="web">Web</SelectItem>
          <SelectItem value="api">API</SelectItem>
        </SelectContent>
      </Select>

      <Select
        value={filters.contentType ?? "all"}
        onValueChange={(v) =>
          set({ contentType: v === "all" ? undefined : (v as Filters["contentType"]) })
        }
      >
        <SelectTrigger className="h-7 w-28 text-xs">
          <SelectValue placeholder="Content type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All types</SelectItem>
          <SelectItem value="audio">Audio</SelectItem>
          <SelectItem value="image">Image</SelectItem>
          <SelectItem value="video">Video</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default AnalyticsFilters;
