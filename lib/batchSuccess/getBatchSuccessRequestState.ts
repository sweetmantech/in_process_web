import { BulkResult } from "@/types/bulk";

interface GetBatchSuccessRequestStateParams {
  result: BulkResult | null;
  urlCollection: string;
  urlTokenIdsParam: string | null;
}

const parseTokenIdsParam = (raw: string | null): string[] =>
  (raw ?? "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

const getBatchSuccessRequestState = ({
  result,
  urlCollection,
  urlTokenIdsParam,
}: GetBatchSuccessRequestStateParams) => {
  const urlTokenIds = parseTokenIdsParam(urlTokenIdsParam);
  const contractAddress = result?.contractAddress || urlCollection;
  const tokenIds = result?.tokenIds?.length ? result.tokenIds : urlTokenIds;
  const hasLocalItems = Boolean(result?.items?.length);
  const needsRemoteHydration = !hasLocalItems && Boolean(contractAddress) && tokenIds.length > 0;

  return {
    contractAddress,
    tokenIds,
    hasLocalItems,
    needsRemoteHydration,
  };
};

export default getBatchSuccessRequestState;
