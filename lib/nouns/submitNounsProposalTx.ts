import { createWalletClient, custom, Address, parseEther } from "viem";
import getViemNetwork from "@/lib/viem/getViemNetwork";
import { getPublicClient } from "@/lib/viem/publicClient";
import { NOUNS_GOVERNOR_ADDRESS } from "./consts";
import { nounsGovernorAbi } from "./abi/nounsGovernorAbi";
import { NounsProposalTransaction } from "@/types/nouns";

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
  await publicClient.waitForTransactionReceipt({ hash });

  return hash;
};
