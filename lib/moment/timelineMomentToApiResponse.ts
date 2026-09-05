import { Address } from "viem";
import { MomentApiResponse, TimelineMoment } from "@/types/moment";

/** Map a collection-timeline moment into the /moment API shape for instant carousel switches. */
export const timelineMomentToApiResponse = (moment: TimelineMoment): MomentApiResponse => {
  const sale = moment.sale ?? null;
  const timeSoldOut = Boolean(sale && sale.saleEnd > 0 && sale.saleEnd * 1000 < Date.now());

  return {
    id: moment.id,
    uri: moment.uri,
    contentUri: moment.metadata?.animation_url ?? moment.metadata?.content?.uri ?? null,
    owner: (moment.creator?.address as Address | undefined) ?? null,
    sale,
    soldOut: timeSoldOut,
    protocol: moment.protocol ?? null,
    admins: (moment.admins ?? []) as Address[],
    metadata: moment.metadata ?? null,
  };
};
