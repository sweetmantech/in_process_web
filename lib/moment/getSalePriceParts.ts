import getPrice from "@/lib/getPrice";
import getPriceUnit from "@/lib/getPriceUnit";
import { MomentSaleConfig, MomentType } from "@/types/moment";

export const getSalePriceParts = (
  sale: MomentSaleConfig | null | undefined
): { priceLabel: string | null; priceUnit: string | null } => {
  if (!sale || BigInt(sale.saleEnd) <= BigInt(0)) {
    return { priceLabel: null, priceUnit: null };
  }
  if (BigInt(sale.pricePerToken) === BigInt(0)) {
    return { priceLabel: "free", priceUnit: null };
  }
  return {
    priceLabel: `${getPrice(sale.pricePerToken, sale.type)}`,
    priceUnit: getPriceUnit(sale.type || MomentType.FixedPriceMint),
  };
};
