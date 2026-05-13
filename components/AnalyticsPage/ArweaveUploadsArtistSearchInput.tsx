"use client";

import { useArweaveUploadsProvider } from "@/providers/ArweaveUploadsProvider";
import AnalyticsArtistSearchInput from "./AnalyticsArtistSearchInput";

const ArweaveUploadsArtistSearchInput = () => {
  const { setArtist } = useArweaveUploadsProvider();

  return <AnalyticsArtistSearchInput onChanged={setArtist} selectionField="username" />;
};

export default ArweaveUploadsArtistSearchInput;
