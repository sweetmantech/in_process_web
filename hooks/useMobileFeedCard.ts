"use client";

import { TimelineMoment } from "@/types/moment";
import { validateUrl } from "@/lib/url/validateUrl";
import { isDeprecatedUrl } from "@/lib/url/isDeprecatedUrl";
import { isYoutubeUrl } from "@/lib/url/isYoutubeUrl";
import { formatSalePriceLabel } from "@/lib/moment/formatSalePriceLabel";
import { isSaleEnded } from "@/lib/moment/isSaleEnded";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";

export const useMobileFeedCard = (moment: TimelineMoment) => {
  const { openCollect } = useMobileDrawersProvider();
  const { metadata, sale } = moment;
  const isSoldOut = isSaleEnded(sale);

  const externalUrl = (() => {
    const url = metadata?.external_url;
    if (!url || isDeprecatedUrl(url) || isYoutubeUrl(url)) return null;
    return validateUrl(url);
  })();

  const onCollect = () => {
    openCollect(moment);
  };

  const onExternalLink = () => {
    if (externalUrl) window.open(externalUrl, "_blank", "noopener,noreferrer");
  };

  return {
    metadata,
    externalUrl,
    priceLabel: formatSalePriceLabel(sale),
    isSoldOut,
    onCollect,
    onExternalLink,
  };
};
