import { useEffect, useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { getFarcasterToken } from "@/lib/auth/getFarcasterToken";

const useAuthHeaders = () => {
  const { getAccessToken, ready } = usePrivy();
  const { isMiniApp, miniAppReady } = useMiniAppProvider();
  const [authorization, setAuthorization] = useState<HeadersInit>({});

  useEffect(() => {
    if (!miniAppReady || !ready) return;
    if (isMiniApp) {
      getFarcasterToken().then((token) =>
        setAuthorization({ Authorization: `Farcaster ${token}` })
      );
    } else {
      getAccessToken().then((token) => {
        if (token) setAuthorization({ Authorization: `Bearer ${token}` });
      });
    }
  }, [miniAppReady, ready, isMiniApp, getAccessToken]);

  return authorization;
};

export default useAuthHeaders;
