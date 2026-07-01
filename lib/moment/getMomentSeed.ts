import { isSaleEnded } from "@/lib/moment/isSaleEnded";
import { MomentApiResponse, TimelineMoment } from "@/types/moment";
import { Address } from "viem";

export const getMomentSeed = (timeline: TimelineMoment): MomentApiResponse => ({
  id: timeline.id,
  uri: timeline.uri,
  contentUri: null,
  owner: null,
  sale: timeline.sale ?? null,
  soldOut: isSaleEnded(timeline.sale),
  protocol: timeline.protocol,
  admins: timeline.admins as Address[],
  metadata: timeline.metadata ?? null,
});
