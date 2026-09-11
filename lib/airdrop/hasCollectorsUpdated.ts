import { CollectorsSnapshot } from "@/lib/airdrop/snapshotCollectors";

const hasCollectorsUpdated = (before: CollectorsSnapshot, after: CollectorsSnapshot) =>
  after.count > before.count || after.totalAmount > before.totalAmount;

export default hasCollectorsUpdated;
