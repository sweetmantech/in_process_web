import { Address } from "viem";
import { IN_PROCESS_API } from "@/lib/consts";
import { Moment } from "@/types/moment";

export const setSale = async (
  accessToken: string,
  moment: Moment,
  {
    saleStart,
    pricePerToken,
    saleEnd,
    fundsRecipient,
  }: {
    saleStart?: number;
    pricePerToken?: string;
    saleEnd?: number;
    fundsRecipient?: Address;
  }
): Promise<{ hash: string; chainId: number }> => {
  const res = await fetch(`${IN_PROCESS_API}/sale`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${accessToken}`,
    },
    body: JSON.stringify({
      moment: {
        tokenId: moment.tokenId,
        collectionAddress: moment.collectionAddress,
        chainId: moment.chainId,
      },
      ...(saleStart !== undefined && { saleStart }),
      ...(pricePerToken !== undefined && { pricePerToken }),
      ...(saleEnd !== undefined && { saleEnd }),
      ...(fundsRecipient !== undefined && { fundsRecipient }),
    }),
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.message || "Failed to update sale");
  }
  return res.json();
};
