import { Address } from "viem";
import { CHAIN_ID, MOMENT_FETCH_TIMEOUT_MS } from "@/lib/consts";
import { getMomentApi } from "@/lib/moment/getMomentApi";
import { BulkResultItem } from "@/types/bulk";
import { MomentApiResponse } from "@/types/moment";

interface FetchBatchSuccessMomentsParams {
  contractAddress: string;
  tokenIds: string[];
}

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
      getMomentApi(
        {
          collectionAddress: contractAddress as Address,
          tokenId,
          chainId: CHAIN_ID,
        },
        AbortSignal.timeout(MOMENT_FETCH_TIMEOUT_MS)
      )
    )
  );

  return responses.map((response, index) =>
    mapMomentApiToBulkResultItem(tokenIds[index], response)
  );
};

export default fetchBatchSuccessMoments;
