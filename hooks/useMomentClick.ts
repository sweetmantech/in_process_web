import { useRouter } from "next/navigation";
import { TimelineMoment } from "@/types/moment";
import { validateUrl } from "@/lib/url/validateUrl";
import { isYoutubeUrl } from "@/lib/url/isYoutubeUrl";
import { isDeprecatedUrl } from "@/lib/url/isDeprecatedUrl";
import { getShortNameFromChainId } from "@/lib/zora/getShortNameFromChainId";

export const useMomentClick = (moment: TimelineMoment | undefined) => {
  const { push } = useRouter();
  const data = moment?.metadata;

  const handleMomentClick = () => {
    if (!moment) return;
    const { chain_id, address, token_id } = moment;
    if (
      data?.external_url &&
      !isDeprecatedUrl(data.external_url) &&
      !isYoutubeUrl(data.external_url)
    ) {
      // Validate URL before opening to prevent phishing
      if (validateUrl(data.external_url)) {
        window.open(data.external_url, "_blank", "noopener,noreferrer");
      }
      return;
    }
    const shortName = getShortNameFromChainId(chain_id);
    if (!shortName) return;
    push(`/collect/${shortName}:${address}/${token_id}`);
  };

  return { handleMomentClick, data };
};
