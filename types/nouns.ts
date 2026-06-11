import { Address } from "viem";

export interface NounsSalesConfig {
  type: string;
  pricePerToken?: string;
  saleStart?: string;
  saleEnd?: string;
  currency?: string;
  erc20Name?: string;
  erc20Symbol?: string;
}

export interface NounsSplitRecipient {
  address: string;
  percentAllocation: number;
}

export interface NounsToken {
  tokenMetadataURI: string;
  createReferral: string;
  salesConfig: NounsSalesConfig;
  mintToCreatorCount: number;
  payoutRecipient?: string;
  maxSupply?: number;
}

export interface NounsContract {
  address?: string;
  name?: string;
  uri?: string;
}

export interface NounsProposal {
  title: string;
  description: string;
}

export interface CreateNounsProposalParams {
  chainId: number;
  account: Address;
  contract: NounsContract;
  tokens: NounsToken[];
  splits?: NounsSplitRecipient[];
  proposal: NounsProposal;
}

export interface NounsProposalTransaction {
  to: string;
  data: string;
  value: string;
}

export interface CreateNounsProposalResult {
  transaction: NounsProposalTransaction;
  proposalThreshold: number;
}

export type NounsContractType = "existing" | "new";

export interface NounsProposalFormValues {
  chainId: number;
  proposalTitle: string;
  proposalDescription: string;
  contractType: NounsContractType;
  contractAddress: string;
  collectionName: string;
  collectionUri: string;
  tokenMetadataURI: string;
}
