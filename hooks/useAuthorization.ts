import { usePrivy } from "@privy-io/react-auth";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { getFarcasterToken } from "@/lib/auth/getFarcasterToken";

const useAuthorization = () => {
  const { getAccessToken } = usePrivy();
  const { isMiniApp } = useMiniAppProvider();

  const getAuthHeaders = async (): Promise<HeadersInit> => {
    if (isMiniApp) {
      const token = await getFarcasterToken();
      return { Authorization: `Farcaster ${token}` };
    }
    const token = await getAccessToken();
    if (!token) throw new Error("Privy is not ready");
    return { Authorization: `Bearer ${token}` };
  };

  return { getAuthHeaders };
};

export default useAuthorization;
