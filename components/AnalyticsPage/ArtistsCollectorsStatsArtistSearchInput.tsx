"use client";

import { useArtistsCollectorsStatsProvider } from "@/providers/ArtistsCollectorsStatsProvider";
import AnalyticsArtistSearchInput from "./AnalyticsArtistSearchInput";

const ArtistsCollectorsStatsArtistSearchInput = () => {
  const { setArtist } = useArtistsCollectorsStatsProvider();

  return <AnalyticsArtistSearchInput onChanged={setArtist} selectionField="username" />;
};

export default ArtistsCollectorsStatsArtistSearchInput;
