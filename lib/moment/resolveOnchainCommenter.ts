import { Address } from "viem";
import fetchOperationalSmartWallet from "@/lib/smartwallets/fetchOperationalSmartWallet";

/** Resolves the onchain commenter (smart wallet) for a display/primary sender. */
async function resolveOnchainCommenter(sender: Address): Promise<Address> {
  try {
    return await fetchOperationalSmartWallet(sender);
  } catch {
    return sender;
  }
}

export default resolveOnchainCommenter;
