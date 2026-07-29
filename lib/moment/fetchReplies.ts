import { Moment, MintComment } from "@/types/moment";
import { IN_PROCESS_API } from "@/lib/consts";
import mapCommentsTree from "@/lib/moment/mapCommentsTree";

async function fetchReplies({
  moment,
  replyToId,
  offset = 0,
}: {
  moment: Moment;
  replyToId: string;
  offset?: number;
}): Promise<MintComment[]> {
  try {
    const queryString = new URLSearchParams({
      collectionAddress: moment.collectionAddress,
      tokenId: moment.tokenId,
      chainId: moment.chainId.toString(),
      offset: offset.toString(),
      replyToId,
    });

    const response = await fetch(`${IN_PROCESS_API}/moment/comments?${queryString}`);

    if (!response.ok) {
      throw new Error("Failed to fetch replies.");
    }

    const data: { comments?: MintComment[] } = await response.json();
    return mapCommentsTree(data.comments ?? []);
  } catch (error) {
    console.error(error);
    return [];
  }
}

export default fetchReplies;
