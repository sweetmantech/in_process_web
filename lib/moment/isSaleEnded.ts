import { MomentSaleConfig } from "@/types/moment";

/** saleEnd elapsed; on-chain supply exhaustion is not reflected here. */
export const isSaleEnded = (sale: MomentSaleConfig | null | undefined): boolean => {
  if (!sale || BigInt(sale.saleEnd) <= BigInt(0)) return false;
  return sale.saleEnd * 1000 < Date.now();
};
