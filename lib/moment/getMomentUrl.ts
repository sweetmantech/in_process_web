import { TimelineMoment } from "@/types/moment";
import { validateUrl } from "@/lib/url/validateUrl";
import { isYoutubeUrl } from "@/lib/url/isYoutubeUrl";
import { isDeprecatedUrl } from "@/lib/url/isDeprecatedUrl";
import { getShortNameFromChainId } from "@/lib/zora/getShortNameFromChainId";

export interface MomentUrl {
  href: string;
  isExternal: boolean;
}

export const getMomentUrl = (moment: TimelineMoment): MomentUrl | undefined => {
  const { chain_id, address, token_id, metadata } = moment;
  const externalUrl = metadata?.external_url;
  if (externalUrl && !isDeprecatedUrl(externalUrl) && !isYoutubeUrl(externalUrl)) {
    const validatedUrl = validateUrl(externalUrl);
    if (validatedUrl) return { href: validatedUrl, isExternal: true };
  }

  const shortName = getShortNameFromChainId(chain_id);
  if (!shortName) return undefined;
  return { href: `/collect/${shortName}:${address}/${token_id}`, isExternal: false };
};
