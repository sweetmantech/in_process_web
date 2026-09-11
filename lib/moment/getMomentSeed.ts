import { isMomentSoldOut } from "@/lib/moment/isMomentSoldOut";
import { MomentApiResponse, TimelineMoment } from "@/types/moment";
import { Address } from "viem";

export const getMomentSeed = (timeline: TimelineMoment): MomentApiResponse => ({
  id: timeline.id,
  uri: timeline.uri,
  contentUri: null,
  owner: null,
  sale: timeline.sale ?? null,
  soldOut: isMomentSoldOut(timeline.sale, timeline.sold_out),
  protocol: timeline.protocol,
  admins: timeline.admins as Address[],
  metadata: timeline.metadata ?? null,
});
