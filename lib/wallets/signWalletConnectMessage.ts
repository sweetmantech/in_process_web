import { Address, createWalletClient, custom } from "viem";
import { CHAIN } from "@/lib/consts";
import { buildWalletConnectMessage } from "@/lib/wallets/buildWalletConnectMessage";

type WalletProvider = Parameters<typeof custom>[0];

export const signWalletConnectMessage = async (
  address: Address,
  provider: WalletProvider,
  clientType: "external" | "farcaster" = "external"
) => {
  const message = buildWalletConnectMessage(address, clientType);
  const walletClient = createWalletClient({
    chain: CHAIN,
    transport: custom(provider),
  });

  const signature = await walletClient.signMessage({
    account: address,
    message,
  });

  return { message, signature };
};
