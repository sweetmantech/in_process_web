import { InfiniteData } from "@tanstack/react-query";
import { Transfer } from "@/types/moment";

export type CollectorsSnapshot = {
  count: number;
  totalAmount: number;
};

type TransfersQueryData = InfiniteData<Transfer[], number>;

const snapshotCollectors = (data: TransfersQueryData | undefined): CollectorsSnapshot => {
  const transfers = data?.pages.flatMap((page) => page) ?? [];
  return {
    count: transfers.length,
    totalAmount: transfers.reduce((sum, transfer) => sum + Number(transfer.amount), 0),
  };
};

export default snapshotCollectors;
