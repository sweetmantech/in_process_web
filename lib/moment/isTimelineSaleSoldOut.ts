import { MomentSaleConfig } from "@/types/moment";

/** Timeline feed: saleEnd time only. On-chain supply exhaustion is not available here. */
export const isTimelineSaleSoldOut = (sale: MomentSaleConfig | null | undefined): boolean => {
  if (!sale || BigInt(sale.saleEnd) <= BigInt(0)) return false;
  return sale.saleEnd * 1000 < Date.now();
};
