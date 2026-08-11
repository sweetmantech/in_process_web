import { Address } from "viem";
import { CHAIN_ID } from "@/lib/consts";
import { getMomentApi } from "@/lib/moment/getMomentApi";
import { BulkResultItem } from "@/types/bulk";
import { MomentApiResponse } from "@/types/moment";

interface FetchBatchSuccessMomentsParams {
  contractAddress: string;
  tokenIds: string[];
}

/** Keep ar:// (and similar) URIs — BlurImage routes thumbs via /media/image. */
const mapMomentApiToBulkResultItem = (
  tokenId: string,
  response: MomentApiResponse
): BulkResultItem => {
  const meta = response.metadata;
  const mime = meta?.content?.mime ?? "";
  const contentUri = meta?.content?.uri || meta?.animation_url || "";
  const imageUri = meta?.image || "";

  return {
    name: meta?.name ?? "",
    previewUrl: imageUri,
    fileUrl: contentUri || imageUri,
    mimeType: mime,
    fileName: "",
    tokenId,
    metadata: meta,
  };
};

const fetchBatchSuccessMoments = async ({
  contractAddress,
  tokenIds,
}: FetchBatchSuccessMomentsParams): Promise<BulkResultItem[]> => {
  const responses = await Promise.all(
    tokenIds.map((tokenId) =>
      getMomentApi({
        collectionAddress: contractAddress as Address,
        tokenId,
        chainId: CHAIN_ID,
      })
    )
  );

  return responses.map((response, index) =>
    mapMomentApiToBulkResultItem(tokenIds[index], response)
  );
};

export default fetchBatchSuccessMoments;
