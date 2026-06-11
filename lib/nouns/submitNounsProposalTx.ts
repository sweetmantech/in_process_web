import { createWalletClient, custom, Address, parseEther } from "viem";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import { getPublicClient } from "@/lib/viem/publicClient";
import { NOUNS_GOVERNOR_ADDRESS } from "./consts";
import { NounsProposalTransaction } from "@/types/nouns";

const NOUNS_GOVERNOR_ABI = [
  {
    name: "propose",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [
      { name: "targets", type: "address[]" },
      { name: "values", type: "uint256[]" },
      { name: "signatures", type: "string[]" },
      { name: "calldatas", type: "bytes[]" },
      { name: "description", type: "string" },
    ],
    outputs: [{ name: "proposalId", type: "uint256" }],
  },
] as const;

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
}: SubmitNounsProposalParams): Promise<`0x${string}`> => {
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
    abi: NOUNS_GOVERNOR_ABI,
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
  await publicClient.waitForTransactionReceipt({ hash });

  return hash;
};
