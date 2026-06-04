"use client";

import CollectorsArtistSearchInput from "./CollectorsArtistSearchInput";
import CollectorsPeriodSelect from "./CollectorsPeriodSelect";

const CollectorsTableFilters = () => (
  <div className="flex flex-wrap items-center gap-2">
    <CollectorsArtistSearchInput />
    <CollectorsPeriodSelect />
  </div>
);

export default CollectorsTableFilters;
