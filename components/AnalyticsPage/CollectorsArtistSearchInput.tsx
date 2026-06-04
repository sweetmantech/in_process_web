"use client";

import { useCollectorsProvider } from "@/providers/CollectorsProvider";
import AnalyticsArtistSearchInput from "./AnalyticsArtistSearchInput";

const CollectorsArtistSearchInput = () => {
  const { setArtist } = useCollectorsProvider();

  return <AnalyticsArtistSearchInput onChanged={setArtist} selectionField="username" />;
};

export default CollectorsArtistSearchInput;
