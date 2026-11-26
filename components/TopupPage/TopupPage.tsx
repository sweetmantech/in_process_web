"use client";

import { useUserProvider } from "@/providers/UserProvider";
import SignToInProcess from "../ManagePage/SignToInProcess";
import { UsdcBalance } from "../Balances/UsdcBalance";
import { EthBalance } from "../Balances/EthBalance";
import { Address } from "viem";
import { Wallet } from "../Balances/Wallet";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import { usePrivy } from "@privy-io/react-auth";
import TopupPageHeader from "./TopupPageHeader";
import TopupPageSkeleton from "./TopupPageSkeleton";

const TopupPage = () => {
  const { signedAddress, userReady } = useUserProvider();
  const { ready } = usePrivy();
  const { smartWallet, isLoading, balance: usdcBalance, ethBalance } = useSmartAccountProvider();

  if (!ready) return <TopupPageSkeleton />;
  if (!signedAddress) return <SignToInProcess />;
  if (!smartWallet && (!userReady || isLoading)) return <TopupPageSkeleton />;

  return (
    <main className="min-h-screen p-4 md:p-8">
      <div className="mx-auto max-w-4xl space-y-6">
        <TopupPageHeader />
        <div className="grid gap-6 md:grid-cols-2">
          <Wallet address={smartWallet as Address} title="Smart Wallet" />
          <div className="space-y-6">
            <UsdcBalance isLoading={isLoading} balance={usdcBalance} />
            <EthBalance isLoading={isLoading} balance={ethBalance} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default TopupPage;
