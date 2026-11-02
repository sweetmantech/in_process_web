import { getFetchableUrl } from "@/lib/protocolSdk/ipfs/gateway";

const useArweaveUrl = (uri: string | null | undefined) => {
  return { url: uri ? getFetchableUrl(uri) : null, isLoading: false, error: null };
};

export default useArweaveUrl;
