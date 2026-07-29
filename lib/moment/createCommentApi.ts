import { Address } from "viem";
import { Moment } from "@/types/moment";
import { IN_PROCESS_API } from "@/lib/consts";
import buildHeaders from "@/lib/http/buildHeaders";

export type CreateCommentReplyTo = {
  commenter: Address;
  contractAddress: Address;
  tokenId: string;
  nonce: string;
};

export type CreateCommentInput = {
  moment: Moment;
  text: string;
  replyTo?: CreateCommentReplyTo;
  headers: HeadersInit;
};

export const createCommentApi = async ({
  moment,
  text,
  replyTo,
  headers,
}: CreateCommentInput): Promise<string> => {
  try {
    const path = `${IN_PROCESS_API}/moment/comments/eip155:${moment.chainId}/erc1155:${moment.collectionAddress}`;
    const response = await fetch(path, {
      method: "POST",
      headers: buildHeaders(headers),
      body: JSON.stringify({
        tokenId: moment.tokenId,
        text,
        ...(replyTo ? { replyTo } : {}),
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data.hash;
  } catch (error) {
    console.error(error);
    throw new Error((error as Error).message || "Failed to create comment");
  }
};
