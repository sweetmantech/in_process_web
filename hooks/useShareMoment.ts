import { CHAIN, SITE_ORIGINAL_URL } from "@/lib/consts";
import { getShortNetworkName } from "@/lib/zora/zoraToViem";
import { useMomentProvider } from "@/providers/MomentProvider";
import truncateAddress from "@/lib/truncateAddress";
import { toast } from "sonner";

const useShareMoment = () => {
  const { moment } = useMomentProvider();
  const shortNetworkName = getShortNetworkName(CHAIN.name.toLowerCase());
  const path = `/collect/${shortNetworkName}:${moment.collectionAddress}/${moment.tokenId}`;

  const share = async () => {
    await navigator.clipboard.writeText(`${SITE_ORIGINAL_URL}${path}`);
    toast.success("copied!");
  };

  const displayUrl = `${SITE_ORIGINAL_URL.replace(/^https?:\/\//, "")}/collect/${shortNetworkName}:${truncateAddress(
    moment.collectionAddress
  )}/${moment.tokenId}`;

  return {
    share,
    displayUrl,
  };
};

export default useShareMoment;
