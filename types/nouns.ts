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

export interface GetNounsProposalActionParams {
  chainId: number;
  account: Address;
  contract: NounsContract;
  tokens: NounsToken[];
  splits?: NounsSplitRecipient[];
  proposal: NounsProposal;
}

export type NounsProposeArgs = [
  targets: string[],
  values: string[],
  signatures: string[],
  calldatas: string[],
  description: string,
];

export interface GetNounsProposalActionResult {
  governor: string;
  args: NounsProposeArgs;
  value: string;
}

export interface SubmitNounsProposalResult {
  txHash: `0x${string}`;
  proposalId: bigint;
  proposer: Address;
  startBlock: bigint;
  endBlock: bigint;
}

export interface NounsProposalFormValues {
  chainId: number;
  proposalTitle: string;
  proposalDescription: string;
  tokenMetadataURI: string;
}
