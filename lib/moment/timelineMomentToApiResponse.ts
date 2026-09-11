import { Address } from "viem";
import { MomentApiResponse, TimelineMoment } from "@/types/moment";
import { isMomentSoldOut } from "@/lib/moment/isMomentSoldOut";

/** Map a collection-timeline moment into the /moment API shape for instant carousel switches. */
export const timelineMomentToApiResponse = (moment: TimelineMoment): MomentApiResponse => {
  const sale = moment.sale ?? null;

  return {
    id: moment.id,
    uri: moment.uri,
    contentUri: moment.metadata?.animation_url ?? moment.metadata?.content?.uri ?? null,
    owner: (moment.creator?.address as Address | undefined) ?? null,
    sale,
    soldOut: isMomentSoldOut(sale, moment.sold_out),
    protocol: moment.protocol ?? null,
    admins: (moment.admins ?? []) as Address[],
    metadata: moment.metadata ?? null,
  };
};
