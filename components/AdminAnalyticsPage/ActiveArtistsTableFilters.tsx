"use client";

import { useState } from "react";
import { AnalyticsPeriod } from "@/types/timeline";
import AnalyticsArtistSearchInput from "./AnalyticsArtistSearchInput";
import AnalyticsPeriodSelect from "./AnalyticsPeriodSelect";

export interface ActiveArtistsTableFiltersValue {
  period: AnalyticsPeriod | undefined;
  artist: string | undefined;
}

interface ActiveArtistsTableFiltersProps {
  onApply: (filters: ActiveArtistsTableFiltersValue) => void;
}

const ActiveArtistsTableFilters = ({ onApply }: ActiveArtistsTableFiltersProps) => {
  const [period, setPeriod] = useState<AnalyticsPeriod | undefined>(undefined);
  const [artistDraft, setArtistDraft] = useState("");
  const [artist, setArtist] = useState<string | undefined>(undefined);

  const handlePeriodChange = (next: AnalyticsPeriod | undefined) => {
    setPeriod(next);
    onApply({ period: next, artist });
  };

  const handleArtistCommit = () => {
    const nextArtist = artistDraft || undefined;
    setArtist(nextArtist);
    onApply({ period, artist: nextArtist });
  };

  return (
    <div className="flex flex-wrap items-center gap-2">
      <AnalyticsArtistSearchInput
        value={artistDraft}
        onValueChange={setArtistDraft}
        onCommit={handleArtistCommit}
      />
      <AnalyticsPeriodSelect value={period} onChange={handlePeriodChange} />
    </div>
  );
};

export default ActiveArtistsTableFilters;
