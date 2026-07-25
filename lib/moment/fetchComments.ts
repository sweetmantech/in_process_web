import { CommentsPage, MomentCommentsInput, MomentCommentsResult } from "@/types/moment";
import { IN_PROCESS_API } from "@/lib/consts";
import flattenComments from "@/lib/moment/flattenComments";

async function fetchComments({ moment, offset }: MomentCommentsInput): Promise<CommentsPage> {
  try {
    const queryString = new URLSearchParams({
      collectionAddress: moment.collectionAddress,
      tokenId: moment.tokenId,
      chainId: moment.chainId.toString(),
      offset: offset?.toString() || "0",
    });

    const response = await fetch(`${IN_PROCESS_API}/moment/comments?${queryString}`);

    if (!response.ok) {
      throw new Error("Failed to fetch comments.");
    }
    const data: MomentCommentsResult = await response.json();
    const topLevel = data.comments ?? [];

    return {
      comments: flattenComments(topLevel),
      topLevelCount: topLevel.length,
    };
  } catch (error) {
    console.error(error);
    return { comments: [], topLevelCount: 0 };
  }
}

export default fetchComments;
