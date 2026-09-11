import { isSaleEnded } from "@/lib/moment/isSaleEnded";
import { MomentSaleConfig } from "@/types/moment";

/** Supply exhausted (timeline sold_out) or saleEnd elapsed. */
export const isMomentSoldOut = (
  sale: MomentSaleConfig | null | undefined,
  soldOut?: boolean | null
): boolean => Boolean(soldOut) || isSaleEnded(sale);
