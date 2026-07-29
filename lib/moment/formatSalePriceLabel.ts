import { getSalePriceParts } from "@/lib/moment/getSalePriceParts";
import { MomentSaleConfig } from "@/types/moment";

export const formatSalePriceLabel = (sale: MomentSaleConfig | null | undefined): string | null => {
  const { priceLabel, priceUnit } = getSalePriceParts(sale);
  if (!priceLabel) return null;
  return priceUnit ? `${priceLabel} ${priceUnit}` : priceLabel;
};
