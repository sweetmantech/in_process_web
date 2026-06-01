import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { getFarcasterToken } from "@/lib/auth/getFarcasterToken";

const useAuthHeaders = () => {
  const { getAccessToken, ready } = usePrivy();
  const { isMiniApp, miniAppReady } = useMiniAppProvider();
  const { signedAddress } = useUserProvider();
  const [authorization, setAuthorization] = useState<HeadersInit>({});

  useEffect(() => {
    if (!miniAppReady || !getAccessToken || !signedAddress) return;
    if (isMiniApp) {
      getFarcasterToken().then((token) =>
        setAuthorization({ Authorization: `Farcaster ${token}` })
      );
    } else {
      getAccessToken().then((token) => {
        if (token) setAuthorization({ Authorization: `Bearer ${token}` });
      });
    }
  }, [miniAppReady, ready, isMiniApp, getAccessToken, signedAddress]);

  return authorization;
};

export default useAuthHeaders;
