import { Transfer, MomentTransfersInput } from "@/types/moment";
import { IN_PROCESS_API } from "@/lib/consts";

async function getTransfers({ moment, page }: MomentTransfersInput): Promise<Transfer[]> {
  try {
    const queryString = new URLSearchParams({
      collection: moment.collectionAddress,
      tokenId: moment.tokenId,
      chainId: moment.chainId.toString(),
      page: (page ?? 1).toString(),
      limit: "20",
    });

    const response = await fetch(`${IN_PROCESS_API}/transfers?${queryString}`);

    if (!response.ok) {
      throw new Error("Failed to fetch collectors.");
    }

    const data: { transfers: any[] } = await response.json();
    return data.transfers.map((t) => ({
      id: String(t.id),
      collector: t.collector?.address ?? "",
      username: t.collector?.username ?? "",
      amount: t.quantity ?? 0,
      transactionHash: t.transaction_hash ?? "",
      timestamp: t.transferred_at ? new Date(t.transferred_at).getTime() : 0,
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default getTransfers;
