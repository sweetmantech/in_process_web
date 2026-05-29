import { IN_PROCESS_API } from "@/lib/consts";
import { Address } from "viem";

const disconnectWallet = async (authHeaders: HeadersInit, walletAddress: Address) => {
  const response = await fetch(`${IN_PROCESS_API}/artists/wallets?address=${walletAddress}`, {
    method: "DELETE",
    headers: authHeaders,
  });
  const data = await response.json();
  return data;
};

export default disconnectWallet;
