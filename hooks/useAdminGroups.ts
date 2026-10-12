import { useMemo } from "react";
import { useQueries } from "@tanstack/react-query";
import { Address } from "viem";
import { getArtistProfile } from "@/lib/artists/getArtistProfile";
import { artistProfileKey } from "@/lib/react-query/queryKeys";
import { PROFILE_READ_STALE_MS } from "@/lib/react-query/staleTimes";
import { groupAdminsByProfile } from "@/lib/admins/groupAdminsByProfile";

const useAdminGroups = (admins: Address[] | null | undefined) => {
  const profiles = useQueries({
    queries: (admins ?? []).map((address) => ({
      queryKey: artistProfileKey(address),
      queryFn: () => getArtistProfile(address),
      staleTime: PROFILE_READ_STALE_MS,
    })),
    combine: (results) => ({
      isLoading: results.some((result) => result.isLoading),
      data: results.map((result) => result.data),
    }),
  });

  const isLoading = !admins || profiles.isLoading;

  const groups = useMemo(
    () => (isLoading || !admins ? null : groupAdminsByProfile(admins, profiles.data)),
    [isLoading, admins, profiles.data]
  );

  return { groups, isLoading };
};

export default useAdminGroups;
