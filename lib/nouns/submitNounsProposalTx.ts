import { createWalletClient, custom, Address, parseEther } from "viem";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import { getPublicClient } from "@/lib/viem/publicClient";
import { NOUNS_GOVERNOR_ADDRESS } from "./consts";
import { nounsGovernorAbi } from "./abi/nounsGovernorAbi";
import { parseNounsProposalCreatedLog } from "./parseNounsProposalCreatedLog";
import { NounsProposalTransaction, SubmitNounsProposalResult } from "@/types/nouns";

interface SubmitNounsProposalParams {
  externalWallet: any;
  chainId: number;
  transaction: NounsProposalTransaction;
  proposalTitle: string;
  proposalDescription: string;
}

export const submitNounsProposalTx = async ({
  externalWallet,
  chainId,
  transaction,
  proposalTitle,
  proposalDescription,
}: SubmitNounsProposalParams): Promise<SubmitNounsProposalResult> => {
  const governorAddress = NOUNS_GOVERNOR_ADDRESS[chainId];
  if (!governorAddress) throw new Error("Governor address not found for chain");

  await externalWallet.switchChain(chainId);
  const provider = await externalWallet.getEthereumProvider();

  const client = createWalletClient({
    account: externalWallet.address as Address,
    chain: getViemNetwork(chainId),
    transport: custom(provider),
  });

  const hash = await client.writeContract({
    address: governorAddress,
    abi: nounsGovernorAbi,
    functionName: "propose",
    args: [
      [transaction.to as Address],
      [parseEther(transaction.value)],
      [""],
      [transaction.data as `0x${string}`],
      `# ${proposalTitle}\n\n${proposalDescription}`,
    ],
  });

  const publicClient = getPublicClient(chainId);
  const receipt = await publicClient.waitForTransactionReceipt({ hash });
  const { proposalId, proposer, startBlock, endBlock } = parseNounsProposalCreatedLog(
    receipt,
    governorAddress
  );

  return {
    txHash: hash,
    proposalId,
    proposer,
    startBlock,
    endBlock,
  };
};
