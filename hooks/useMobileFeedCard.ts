"use client";

import { useRouter } from "next/navigation";
import { TimelineMoment } from "@/types/moment";
import { validateUrl } from "@/lib/url/validateUrl";
import { isDeprecatedUrl } from "@/lib/url/isDeprecatedUrl";
import { isYoutubeUrl } from "@/lib/url/isYoutubeUrl";
import { getShortNameFromChainId } from "@/lib/zora/getShortNameFromChainId";
import { formatSalePriceLabel } from "@/lib/moment/formatSalePriceLabel";

export const useMobileFeedCard = (moment: TimelineMoment) => {
  const { push } = useRouter();
  const { chain_id, address, token_id, metadata, sale } = moment;

  const externalUrl = (() => {
    const url = metadata?.external_url;
    if (!url || isDeprecatedUrl(url) || isYoutubeUrl(url)) return null;
    return validateUrl(url);
  })();

  const onCollect = () => {
    const shortName = getShortNameFromChainId(chain_id);
    if (!shortName) return;
    push(`/collect/${shortName}:${address}/${token_id}`);
  };

  const onExternalLink = () => {
    if (externalUrl) window.open(externalUrl, "_blank", "noopener,noreferrer");
  };

  return {
    metadata,
    externalUrl,
    priceLabel: formatSalePriceLabel(sale),
    onCollect,
    onExternalLink,
  };
};
