import { Address } from "viem";
import { CHAIN_ID, IN_PROCESS_API } from "@/lib/consts";

const callSmartWalletBalancesApi = async (artistId: string, chainId: number = CHAIN_ID) => {
  const params = new URLSearchParams({ artistId, chainId: String(chainId) });

  const res = await fetch(`${IN_PROCESS_API}/smartwallet/balances?${params.toString()}`);
  if (!res.ok) {
    const err = await res
      .json()
      .catch(() => ({ message: "Failed to fetch smart wallet balances" }));
    throw new Error(err.message ?? "Failed to fetch smart wallet balances");
  }

  const data = await res.json();
  return {
    smartWallet: data.address as Address,
    usdcBalance: data.usdc_balance as string,
    ethBalance: data.eth_balance as string,
  };
};

export default callSmartWalletBalancesApi;
