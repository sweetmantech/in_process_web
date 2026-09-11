import { InfiniteData, QueryClient } from "@tanstack/react-query";
import { Transfer } from "@/types/moment";
import hasCollectorsUpdated from "@/lib/airdrop/hasCollectorsUpdated";
import snapshotCollectors from "@/lib/airdrop/snapshotCollectors";
import sleep from "@/lib/utils/sleep";

const INDEXER_SETTLE_MS = 3000; // indexer usually picks up airdrop transfers within ~3s
const POLL_INTERVAL_MS = 2000; // retry spacing when the first refetch is still stale
const MAX_ATTEMPTS = 5; // ~3s + 4×2s ≈ 11s total window

type TransfersQueryData = InfiniteData<Transfer[], number>;

const refreshCollectorsAfterAirdrop = async ({
  queryClient,
  collectionAddress,
  tokenId,
  chainId,
}: {
  queryClient: QueryClient;
  collectionAddress: string;
  tokenId: string;
  chainId: number;
}) => {
  const queryKey = ["moment-transfers", collectionAddress, tokenId, chainId] as const;
  const before = snapshotCollectors(queryClient.getQueryData<TransfersQueryData>(queryKey));

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    await sleep(attempt === 0 ? INDEXER_SETTLE_MS : POLL_INTERVAL_MS);
    await queryClient.refetchQueries({ queryKey });
    const after = snapshotCollectors(queryClient.getQueryData<TransfersQueryData>(queryKey));
    if (hasCollectorsUpdated(before, after)) return;
  }
};

export default refreshCollectorsAfterAirdrop;
