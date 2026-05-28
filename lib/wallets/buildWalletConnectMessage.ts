import { Address } from "viem";

export const buildWalletConnectMessage = (
  address: Address,
  clientType: "external" | "farcaster" = "external"
) => `${address}\nclient-type:${clientType}`;
