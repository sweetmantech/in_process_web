import { useUserProvider } from "@/providers/UserProvider";
import { useArtistProfile } from "./useArtistProfile";

const useShowUsernameHint = () => {
  const { signedAddress } = useUserProvider();
  const { data, isSuccess } = useArtistProfile(signedAddress);
  return Boolean(signedAddress && isSuccess && !data?.username);
};

export default useShowUsernameHint;
