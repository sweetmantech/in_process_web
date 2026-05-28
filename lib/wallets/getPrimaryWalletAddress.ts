import { ArtistWallet } from "@/types/artist";

export const getPrimaryWalletAddress = (wallets: ArtistWallet[] = []): string | undefined => {
  if (!wallets.length) return undefined;

  const privyWallet = wallets.find((wallet) => wallet.type === "privy");
  const externalWallet = wallets.find((wallet) => wallet.type === "external");

  return (privyWallet ?? externalWallet ?? wallets[0])?.address;
};
