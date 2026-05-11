"use client";

import { useActiveArtistsProvider } from "@/providers/ActiveArtistsProvider";
import AnalyticsArtistSearchInput from "./AnalyticsArtistSearchInput";

const ActiveArtistsArtistSearchInput = () => {
  const { artistDraft, setArtistDraft, commitArtist } = useActiveArtistsProvider();

  return (
    <AnalyticsArtistSearchInput
      value={artistDraft}
      onValueChange={setArtistDraft}
      onCommit={commitArtist}
    />
  );
};

export default ActiveArtistsArtistSearchInput;
