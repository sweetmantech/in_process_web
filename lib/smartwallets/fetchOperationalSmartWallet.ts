import { Address } from "viem";
import { IN_PROCESS_API } from "@/lib/consts";

const fetchOperationalSmartWallet = async (walletAddress: Address): Promise<Address> => {
  const params = new URLSearchParams({ walletAddress });
  const res = await fetch(`${IN_PROCESS_API}/smartwallet?${params.toString()}`);

  if (!res.ok) {
    const err = await res
      .json()
      .catch(() => ({ message: "Failed to fetch operational smart wallet" }));
    throw new Error(err.message ?? "Failed to fetch operational smart wallet");
  }

  const data = await res.json();
  return data.address as Address;
};

export default fetchOperationalSmartWallet;
