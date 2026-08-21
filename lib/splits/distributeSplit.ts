import { Address } from "viem";
import { IN_PROCESS_API } from "@/lib/consts";

export const distributeSplit = async ({
  splitAddress,
  tokenAddress,
  chainId,
}: {
  splitAddress: Address;
  tokenAddress?: Address;
  chainId: number;
}): Promise<{ status: string; hash: string }> => {
  const params = new URLSearchParams({
    splitAddress,
    chainId: String(chainId),
  });
  if (tokenAddress) params.set("tokenAddress", tokenAddress);

  const res = await fetch(`${IN_PROCESS_API}/splits?${params.toString()}`);
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error || body.message || "Failed to distribute split");
  }
  return res.json();
};
