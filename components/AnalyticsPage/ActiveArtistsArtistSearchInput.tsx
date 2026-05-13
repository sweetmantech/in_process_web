"use client";

import { useActiveArtistsProvider } from "@/providers/ActiveArtistsProvider";
import AnalyticsArtistSearchInput from "./AnalyticsArtistSearchInput";

const ActiveArtistsArtistSearchInput = () => {
  const { setArtist } = useActiveArtistsProvider();

  return <AnalyticsArtistSearchInput onChanged={setArtist} selectionField="username" />;
};

export default ActiveArtistsArtistSearchInput;
