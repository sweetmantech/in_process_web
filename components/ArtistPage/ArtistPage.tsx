"use client";

import { useParams } from "next/navigation";
import ProfileProvider from "@/providers/ProfileProvider";
import { Address } from "viem";
import ArtistPageContent from "./ArtistPageContent";

const ArtistPage = () => {
  const { artistAddress } = useParams();
  const address = artistAddress?.toString().toLowerCase() as Address | undefined;

  return (
    <ProfileProvider address={address}>
      {address ? <ArtistPageContent address={address} /> : null}
    </ProfileProvider>
  );
};

export default ArtistPage;
