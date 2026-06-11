import { createWalletClient, custom, Address } from "viem";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import { getPublicClient } from "@/lib/viem/publicClient";
import { nounsGovernorAbi } from "./abi/nounsGovernorAbi";
import { parseNounsProposalCreatedLog } from "./parseNounsProposalCreatedLog";
import { getNounsProposalSubmitErrorMessage } from "./getNounsProposalSubmitErrorMessage";
import { NounsProposeArgs, SubmitNounsProposalResult } from "@/types/nouns";

interface SubmitNounsProposalParams {
  externalWallet: any;
  chainId: number;
  governor: string;
  args: NounsProposeArgs;
}

const toProposeContractArgs = (args: NounsProposeArgs) => {
  const [targets, values, signatures, calldatas, description] = args;
  return [
    targets as Address[],
    values.map((value) => BigInt(value)),
    signatures,
    calldatas as `0x${string}`[],
    description,
  ] as const;
};

export const submitNounsProposalTx = async ({
  externalWallet,
  chainId,
  governor,
  args,
}: SubmitNounsProposalParams): Promise<SubmitNounsProposalResult> => {
  const governorAddress = governor as Address;

  await externalWallet.switchChain(chainId);
  const provider = await externalWallet.getEthereumProvider();

  const account = externalWallet.address as Address;
  const publicClient = getPublicClient(chainId);
  const client = createWalletClient({
    account,
    chain: getViemNetwork(chainId),
    transport: custom(provider),
  });

  const proposeArgs = toProposeContractArgs(args);

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
    throw new Error(getNounsProposalSubmitErrorMessage(err));
  }

  let hash;
  try {
    hash = await client.writeContract(request);
  } catch (err) {
    console.error("[nouns] propose transaction failed", err);
    throw new Error(getNounsProposalSubmitErrorMessage(err));
  }
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
