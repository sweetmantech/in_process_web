"use client";

import ArtistsCollectorsStatsArtistSearchInput from "./ArtistsCollectorsStatsArtistSearchInput";
import ArtistsCollectorsStatsPeriodSelect from "./ArtistsCollectorsStatsPeriodSelect";

const ArtistsCollectorsStatsTableFilters = () => (
  <div className="flex flex-wrap items-center gap-2">
    <ArtistsCollectorsStatsArtistSearchInput />
    <ArtistsCollectorsStatsPeriodSelect />
  </div>
);

export default ArtistsCollectorsStatsTableFilters;
