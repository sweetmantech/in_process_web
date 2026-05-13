"use client";

import ActiveArtistsArtistSearchInput from "./ActiveArtistsArtistSearchInput";
import ActiveArtistsPeriodSelect from "./ActiveArtistsPeriodSelect";

const ActiveArtistsTableFilters = () => (
  <div className="flex flex-wrap items-center gap-2">
    <ActiveArtistsArtistSearchInput />
    <ActiveArtistsPeriodSelect />
  </div>
);

export default ActiveArtistsTableFilters;
