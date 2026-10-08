import { Address } from "viem";
import { TURBO_PAYMENT_URL } from "@/lib/consts";

const getTurboUsdcDepositAddress = async (): Promise<Address> => {
  const res = await fetch(`${TURBO_PAYMENT_URL}/info`);
  if (!res.ok) throw new Error("Failed to fetch Turbo deposit address");
  const { addresses } = (await res.json()) as { addresses: Record<string, string> };
  const address = addresses["base-usdc"];
  if (!address) throw new Error("Turbo USDC deposit address not found");
  return address as Address;
};

export default getTurboUsdcDepositAddress;
