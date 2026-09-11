import { Address, erc20Abi, formatUnits } from "viem";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN_ID, USDC_ADDRESS } from "@/lib/consts";

const getUsdcAllowance = async (owner: Address, spender: Address): Promise<string> => {
  const publicClient = getPublicClient(CHAIN_ID);
  const allowance = await publicClient.readContract({
    address: USDC_ADDRESS[CHAIN_ID],
    abi: erc20Abi,
    functionName: "allowance",
    args: [owner, spender],
  });

  return formatUnits(allowance, 6);
};

export default getUsdcAllowance;
