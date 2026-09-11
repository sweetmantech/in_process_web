import { InfiniteData } from "@tanstack/react-query";
import { Transfer } from "@/types/moment";

type TransfersQueryData = InfiniteData<Transfer[], number>;

const prependCollectorsTransfers = (
  data: TransfersQueryData | undefined,
  transfers: Transfer[]
): TransfersQueryData => {
  if (!data) {
    return { pages: [transfers], pageParams: [1] };
  }

  const [firstPage = [], ...restPages] = data.pages;
  return {
    ...data,
    pages: [[...transfers, ...firstPage], ...restPages],
  };
};

export default prependCollectorsTransfers;
