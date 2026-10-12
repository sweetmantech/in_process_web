import { ArtistWallet } from "@/types/artist";
import { isSmartWalletType } from "@/lib/wallets/isSmartWalletType";

export const getPrimaryWalletAddress = (wallets: ArtistWallet[] = []): string | undefined => {
  if (!wallets.length) return undefined;

  const privyWallet = wallets.find((wallet) => wallet.type === "privy");
  const externalWallet = wallets.find((wallet) => wallet.type === "external");
  const eoaWallet = wallets.find((wallet) => !isSmartWalletType(wallet.type));

  return (privyWallet ?? externalWallet ?? eoaWallet ?? wallets[0])?.address;
};
