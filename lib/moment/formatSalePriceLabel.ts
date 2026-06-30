import getPrice from "@/lib/getPrice";
import getPriceUnit from "@/lib/getPriceUnit";
import { MomentSaleConfig } from "@/types/moment";

export const formatSalePriceLabel = (sale: MomentSaleConfig | null | undefined): string | null => {
  if (!sale || BigInt(sale.saleEnd) <= BigInt(0)) return null;
  if (BigInt(sale.pricePerToken) === BigInt(0)) return "free";
  return `${getPrice(sale.pricePerToken, sale.type)} ${getPriceUnit(sale.type)}`;
};
