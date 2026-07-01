import { Moment, TimelineMoment } from "@/types/moment";
import { Address } from "viem";

export const getMomentKey = (timeline: TimelineMoment): Moment => ({
  collectionAddress: timeline.address as Address,
  tokenId: timeline.token_id,
  chainId: timeline.chain_id,
});
