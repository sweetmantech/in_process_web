import { SITE_ORIGINAL_URL } from "@/lib/consts";
import useCopy from "@/hooks/useCopy";
import { useArtistProfile } from "@/hooks/useArtistProfile";
import { useUserProvider } from "@/providers/UserProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";

const useProfileLink = () => {
  const { signedAddress, handle } = useUserProvider();
  const { primaryWallet } = useWalletsProvider();
  const { data } = useArtistProfile(signedAddress);

  const savedHandle = data?.handle || "";
  const slug = savedHandle || primaryWallet || "";
  const profileUrl = slug ? `${SITE_ORIGINAL_URL}/${slug}` : "";
  const isHandleUnsaved = handle !== savedHandle;

  const { copied, copy } = useCopy(profileUrl);

  return { copied, copy, canCopy: Boolean(profileUrl) && !isHandleUnsaved };
};

export default useProfileLink;
