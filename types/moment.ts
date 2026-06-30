import { Address, Hash } from "viem";

export enum Protocol {
  InProcess = "in_process",
  Catalog = "catalog",
  SoundXyz = "sound.xyz",
  ZoraMedia = "zora_media",
}
export interface Moment {
  collectionAddress: Address;
  tokenId: string;
  chainId: number;
}

export interface MomentCommentsInput {
  moment: Moment;
  offset: number;
}

export interface MomentCommentsResult {
  comments: MintComment[];
}

export interface MintComment {
  id: string;
  username: string;
  sender: string;
  comment: string;
  timestamp: number;
}

export interface MomentMetadata {
  image: string;
  name: string;
  description: string;
  external_url?: string;
  content: {
    mime: string;
    uri: string;
  };
  animation_url?: string;
}

export enum MomentType {
  Erc20Mint = "erc20Mint",
  TimedMint = "timed",
  FixedPriceMint = "fixedPrice",
}

export interface TimelineMoment {
  address: string;
  token_id: string;
  chain_id: number;
  id: string;
  uri: string;
  protocol: Protocol;
  creator: {
    address: string;
    username: string | null;
  };
  admins: string[];
  hidden: string[];
  created_at: string;
  metadata?: MomentMetadata;
  sale?: MomentSaleConfig | null;
}

export type MomentSaleConfig = {
  pricePerToken: string;
  saleStart: number;
  saleEnd: number;
  maxTokensPerAddress: number;
  fundsRecipient: Address;
  type: MomentType;
};

export interface MigrateMomentsApiInput {
  chainId?: number;
}

interface MigrateMomentsResult {
  hash: Hash;
  chainId: number;
}

export interface MigrateMomentsApiResult {
  message: string;
  results: MigrateMomentsResult[];
}

export interface Transfer {
  id: string;
  collector: string;
  username: string;
  amount: number;
  transactionHash: string;
  timestamp: number;
}

export interface MomentTransfersInput {
  moment: Moment;
  page?: number;
}

export interface MomentTransfersResult {
  collectors: Transfer[];
}
