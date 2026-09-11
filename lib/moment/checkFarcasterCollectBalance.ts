import { Address, parseUnits } from "viem";
import { MomentSaleConfig, MomentType } from "@/types/moment";
import { Currency } from "@/types/balances";
import getUsdcBalance from "@/lib/balance/getUsdcBalance";
import { getPublicClient } from "@/lib/viem/publicClient";
import { CHAIN_ID } from "@/lib/consts";

export type FarcasterCollectBalanceResult = {
  sufficient: boolean;
  currency: Currency;
  totalPriceBase: bigint;
};

const checkFarcasterCollectBalance = async (
  account: Address,
  saleConfig: MomentSaleConfig,
  mintCount: number
): Promise<FarcasterCollectBalanceResult> => {
  const isErc20Mint = saleConfig.type === MomentType.Erc20Mint;
  const currency: Currency = isErc20Mint ? "usdc" : "eth";
  const totalPriceBase = BigInt(saleConfig.pricePerToken) * BigInt(mintCount);

  if (isErc20Mint) {
    const balance = await getUsdcBalance(account);
    return {
      sufficient: parseUnits(balance, 6) >= totalPriceBase,
      currency,
      totalPriceBase,
    };
  }

  const ethBalance = await getPublicClient(CHAIN_ID).getBalance({ address: account });
  return {
    sufficient: ethBalance >= totalPriceBase,
    currency,
    totalPriceBase,
  };
};

export default checkFarcasterCollectBalance;
