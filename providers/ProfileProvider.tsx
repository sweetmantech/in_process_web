"use client";

import useArtistEdit from "@/hooks/useArtistEdit";
import useProfile from "@/hooks/useProfile";
import { createContext, useMemo, useContext } from "react";
import { Address } from "viem";

type ProfileContextValue = ReturnType<typeof useProfile> & ReturnType<typeof useArtistEdit>;

const ProfileContext = createContext<ProfileContextValue | null>(null);

interface IProfileProvider {
  children: React.ReactNode;
  address: Address | undefined;
}
const ProfileProvider = ({ children, address }: IProfileProvider) => {
  const profile = useProfile(address);
  const artistEdit = useArtistEdit(profile, address);

  const value = useMemo(
    () => ({
      ...profile,
      ...artistEdit,
    }),
    [profile, artistEdit]
  );

  return <ProfileContext.Provider value={value}>{children}</ProfileContext.Provider>;
};

export const useProfileProvider = () => {
  const context = useContext(ProfileContext);
  if (!context) {
    throw new Error("useProfileProvider must be used within a ProfileProvider");
  }
  return context;
};

export default ProfileProvider;
