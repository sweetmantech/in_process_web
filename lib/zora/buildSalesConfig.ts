import getSalesConfig from "./getSalesConfig";
import getSaleConfigType from "@/lib/getSaleConfigType";

const buildSalesConfig = (priceUnit: string, price: string, startDate: Date | undefined) => {
  const isUsdc = priceUnit === "usdc";
  return getSalesConfig(getSaleConfigType(isUsdc ? "erc20Mint" : "fixedPrice"), price, startDate);
};

export default buildSalesConfig;
