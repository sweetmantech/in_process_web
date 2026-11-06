"use client";

import ProfileProvider from "@/providers/ProfileProvider";
import { Address } from "viem";
import ArtistPageContent from "./ArtistPageContent";

const ArtistPage = ({ address }: { address: Address }) => (
  <ProfileProvider address={address}>
    <ArtistPageContent address={address} />
  </ProfileProvider>
);

export default ArtistPage;
