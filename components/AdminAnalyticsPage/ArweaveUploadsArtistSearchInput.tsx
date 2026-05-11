"use client";

import { useArweaveUploadsProvider } from "@/providers/ArweaveUploadsProvider";
import AnalyticsArtistSearchInput from "./AnalyticsArtistSearchInput";

const ArweaveUploadsArtistSearchInput = () => {
  const { artistDraft, setArtistDraft, commitArtist } = useArweaveUploadsProvider();

  return (
    <AnalyticsArtistSearchInput
      value={artistDraft}
      onValueChange={setArtistDraft}
      onCommit={commitArtist}
    />
  );
};

export default ArweaveUploadsArtistSearchInput;
