import type { CollectorTransfer } from "@/types/collectorTransfer";
import { Protocol, type TimelineMoment } from "@/types/moment";

export const toTimelineMoment = (transfer: CollectorTransfer): TimelineMoment => {
  const { metadata, collection, token_id, sale } = transfer.moment;
  return {
    address: collection.address,
    token_id: String(token_id),
    chain_id: collection.chain_id,
    id: String(transfer.id),
    uri: "",
    protocol: collection.protocol as Protocol,
    creator: {
      address: collection.artist?.address ?? "",
      username: collection.artist?.username ?? null,
    },
    admins: [],
    hidden: [],
    created_at: transfer.transferred_at,
    metadata: metadata ?? undefined,
    sale: sale ?? null,
    comments: transfer.moment.comments ?? 0,
  };
};
