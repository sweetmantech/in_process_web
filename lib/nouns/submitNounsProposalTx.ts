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

  const account = externalWallet.address as Address;
  const publicClient = getPublicClient(chainId);
  const client = createWalletClient({
    account,
    chain: getViemNetwork(chainId),
    transport: custom(provider),
  });

  const proposeArgs = [
    [transaction.to as Address],
    [parseEther(transaction.value)],
    [""],
    [transaction.data as `0x${string}`],
    `# ${proposalTitle}\n\n${proposalDescription}`,
  ] as const;

  let request;
  try {
    const simulation = await publicClient.simulateContract({
      address: governorAddress,
      abi: nounsGovernorAbi,
      functionName: "propose",
      args: proposeArgs,
      account,
    });
    console.log("[nouns] propose simulation succeeded", {
      proposalId: simulation.result,
      account,
      governorAddress,
    });
    request = simulation.request;
  } catch (err) {
    console.error("[nouns] propose simulation failed", err);
    throw err;
  }

  const hash = await client.writeContract(request);
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
