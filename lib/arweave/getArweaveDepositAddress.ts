import { Address } from "viem";
import { IN_PROCESS_API } from "@/lib/consts";

const getArweaveDepositAddress = async (): Promise<Address> => {
  const res = await fetch(`${IN_PROCESS_API}/arweave/deposit`);
  if (!res.ok) throw new Error("Failed to fetch Arweave deposit address");
  const { address } = (await res.json()) as { address: Address };
  return address;
};

export default getArweaveDepositAddress;
