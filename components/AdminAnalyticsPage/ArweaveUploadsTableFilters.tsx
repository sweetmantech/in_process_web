"use client";

import ArweaveUploadsArtistSearchInput from "./ArweaveUploadsArtistSearchInput";
import ArweaveUploadsPeriodSelect from "./ArweaveUploadsPeriodSelect";

const ArweaveUploadsTableFilters = () => (
  <div className="flex flex-wrap items-center gap-2">
    <ArweaveUploadsArtistSearchInput />
    <ArweaveUploadsPeriodSelect />
  </div>
);

export default ArweaveUploadsTableFilters;
