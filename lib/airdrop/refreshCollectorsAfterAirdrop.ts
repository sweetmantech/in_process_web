import { InfiniteData, QueryClient } from "@tanstack/react-query";
import { AirdropItem } from "@/types/airdrop";
import { Transfer } from "@/types/moment";
import buildOptimisticAirdropTransfers from "@/lib/airdrop/buildOptimisticAirdropTransfers";
import hasCollectorsUpdated from "@/lib/airdrop/hasCollectorsUpdated";
import prependCollectorsTransfers from "@/lib/airdrop/prependCollectorsTransfers";
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
  items,
  transactionHash,
}: {
  queryClient: QueryClient;
  collectionAddress: string;
  tokenId: string;
  chainId: number;
  items: AirdropItem[];
  transactionHash: string;
}) => {
  const queryKey = ["moment-transfers", collectionAddress, tokenId, chainId] as const;
  const before = snapshotCollectors(queryClient.getQueryData<TransfersQueryData>(queryKey));
  const optimisticTransfers = buildOptimisticAirdropTransfers({ items, transactionHash });

  queryClient.setQueryData<TransfersQueryData>(queryKey, (current) =>
    prependCollectorsTransfers(current, optimisticTransfers)
  );
  const optimisticData = queryClient.getQueryData<TransfersQueryData>(queryKey);

  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt++) {
    await sleep(attempt === 0 ? INDEXER_SETTLE_MS : POLL_INTERVAL_MS);
    await queryClient.refetchQueries({ queryKey });
    const after = snapshotCollectors(queryClient.getQueryData<TransfersQueryData>(queryKey));
    if (hasCollectorsUpdated(before, after)) return;
    // Keep optimistic rows visible until the indexer has caught up
    if (optimisticData) queryClient.setQueryData(queryKey, optimisticData);
  }
};

export default refreshCollectorsAfterAirdrop;
