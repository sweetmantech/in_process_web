import { useCallback } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { getFarcasterToken } from "@/lib/auth/getFarcasterToken";

const useAuthHeaders = () => {
  const { getAccessToken } = usePrivy();
  const { context, miniAppReady } = useMiniAppProvider();
  // Only treat as Farcaster once the miniapp SDK has finished loading;
  // before that, context is undefined in both Farcaster and non-Farcaster environments.
  const isFarcasterMiniApp = miniAppReady && Boolean(context);

  return useCallback(async (): Promise<HeadersInit> => {
    if (!miniAppReady) throw new Error("auth context not ready");
    if (isFarcasterMiniApp) {
      const token = await getFarcasterToken();
      return { Authorization: `Farcaster ${token}` };
    }
    const token = await getAccessToken();
    if (!token) throw new Error("Privy access token unavailable");
    return { Authorization: `Bearer ${token}` };
  }, [miniAppReady, isFarcasterMiniApp, getAccessToken]);
};

export default useAuthHeaders;
