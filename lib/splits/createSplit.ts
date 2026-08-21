import { Address } from "viem";
import { IN_PROCESS_API } from "@/lib/consts";

export type SplitRecipientInput = {
  address: string;
  percentAllocation: number;
};

export const createSplit = async (
  accessToken: string,
  splits: SplitRecipientInput[]
): Promise<{ splitAddress: Address; chainId: number }> => {
  const res = await fetch(`${IN_PROCESS_API}/splits`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({ splits }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Failed to create split");
  }
  return res.json();
};
