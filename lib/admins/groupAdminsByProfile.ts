import { Address } from "viem";
import { AdminGroup } from "@/types/admins";
import { ArtistProfile } from "@/types/artist";

export const groupAdminsByProfile = (
  admins: Address[],
  profiles: (ArtistProfile | null | undefined)[]
): AdminGroup[] => {
  const groups = new Map<string, AdminGroup>();

  admins.forEach((address, index) => {
    const profile = profiles[index];
    const key = profile?.id ?? address.toLowerCase();
    const group = groups.get(key);
    if (group) {
      group.addresses.push(address);
      return;
    }
    groups.set(key, {
      key,
      artistId: profile?.id ?? null,
      username: profile?.username ?? null,
      addresses: [address],
    });
  });

  return Array.from(groups.values());
};
