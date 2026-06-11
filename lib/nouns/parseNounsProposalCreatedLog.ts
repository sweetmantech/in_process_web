import { Address, parseEventLogs, TransactionReceipt } from "viem";
import { nounsGovernorAbi } from "./abi/nounsGovernorAbi";

export interface NounsProposalCreatedInfo {
  proposalId: bigint;
  proposer: Address;
  startBlock: bigint;
  endBlock: bigint;
}

export const parseNounsProposalCreatedLog = (
  receipt: TransactionReceipt,
  governorAddress: Address
): NounsProposalCreatedInfo => {
  const logs = parseEventLogs({
    abi: nounsGovernorAbi,
    logs: receipt.logs.filter((log) => log.address.toLowerCase() === governorAddress.toLowerCase()),
  });

  const created = logs.find(
    (log) =>
      log.eventName === "ProposalCreated" || log.eventName === "ProposalCreatedWithRequirements"
  );

  if (!created) {
    throw new Error("ProposalCreated event not found in transaction receipt");
  }

  return {
    proposalId: created.args.id,
    proposer: created.args.proposer,
    startBlock: created.args.startBlock,
    endBlock: created.args.endBlock,
  };
};
