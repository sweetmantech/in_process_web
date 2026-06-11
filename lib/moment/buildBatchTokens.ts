import { REFERRAL_RECIPIENT } from "@/lib/consts";

interface BatchToken {
  tokenMetadataURI: string;
  createReferral: string;
  salesConfig: Record<string, unknown>;
  mintToCreatorCount: number;
  payoutRecipient: string;
}

const buildBatchTokens = (
  metadataUris: string[],
  salesConfig: Record<string, unknown>,
  payoutRecipient: string
): BatchToken[] =>
  metadataUris.map((uri) => ({
    tokenMetadataURI: uri,
    createReferral: REFERRAL_RECIPIENT,
    salesConfig,
    mintToCreatorCount: 1,
    payoutRecipient,
  }));

export default buildBatchTokens;
