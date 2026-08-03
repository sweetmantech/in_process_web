import type { MomentMetadata, Protocol } from "@/types/moment";

export type CollectorTransferArtist = {
  address: string | null;
  username: string | null;
};

export type CollectorTransfer = {
  id: string | number;
  quantity: number;
  value: number | null;
  currency: string | null;
  transaction_hash: string;
  transferred_at: string;
  collector: {
    address: string | null;
    username: string | null;
  };
  moment: {
    token_id: number | string;
    collection: {
      address: string;
      chain_id: number;
      protocol: Protocol | string;
      artist?: CollectorTransferArtist | null;
    };
    metadata: MomentMetadata | null;
  };
};

export type CollectorTransfersResponse = {
  transfers: CollectorTransfer[];
  pagination: {
    total_count: number;
    page: number;
    limit: number;
    total_pages: number;
  };
};
