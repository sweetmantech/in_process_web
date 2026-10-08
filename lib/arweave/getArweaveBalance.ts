import { ARWEAVE_WALLET_ADDRESS, TURBO_PAYMENT_URL } from "@/lib/consts";

export interface ArweaveBalance {
  credits: number;
  usd: number;
}

const WINC_PER_CREDIT = 1e12;

const getArweaveBalance = async (): Promise<ArweaveBalance> => {
  const [balanceRes, ratesRes] = await Promise.all([
    fetch(`${TURBO_PAYMENT_URL}/account/balance/arweave?address=${ARWEAVE_WALLET_ADDRESS}`),
    fetch(`${TURBO_PAYMENT_URL}/rates`),
  ]);
  if (!balanceRes.ok) throw new Error("Failed to fetch Arweave balance");
  if (!ratesRes.ok) throw new Error("Failed to fetch Turbo rates");

  const { winc } = (await balanceRes.json()) as { winc: string };
  const rates = (await ratesRes.json()) as { winc: string; fiat: { usd: number } };

  const wincBalance = Number(winc ?? "0");
  return {
    credits: wincBalance / WINC_PER_CREDIT,
    usd: (wincBalance / Number(rates.winc)) * rates.fiat.usd,
  };
};

export default getArweaveBalance;
