"use client";

import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import ExternalWalletButton from "@/components/ExternalWalletButton";
import PhoneButton from "./PhoneButton";
import { PhoneVerificationProvider } from "@/providers/PhoneVerificationProvider";
import { EmailVerificationProvider } from "@/providers/EmailVerificationProvider";
import AccountPageSkeleton from "./AccountPageSkeleton";
import SignToInProcess from "./SignToInProcess";
import ProfileInfoCard from "./ProfileInfoCard";
import ConnectionsCard from "./ConnectionsCard";
import ConnectEmail from "@/components/ConnectEmail";

const AccountPage = () => {
  const { isMiniApp } = useMiniAppProvider();
  const { primaryWallet, walletsReady } = useWalletsProvider();

  if (!walletsReady) return <AccountPageSkeleton />;
  if (!primaryWallet) return <SignToInProcess />;

  const connections = (
    <ConnectionsCard>
      {isMiniApp ? <ConnectEmail /> : <ExternalWalletButton />}
      <PhoneButton />
    </ConnectionsCard>
  );

  return (
    <main className="flex flex-col gap-3 pb-6 font-archivo md:gap-4 md:pb-0">
      <ProfileInfoCard />
      <PhoneVerificationProvider>
        {isMiniApp ? (
          <EmailVerificationProvider>{connections}</EmailVerificationProvider>
        ) : (
          connections
        )}
      </PhoneVerificationProvider>
    </main>
  );
};

export default AccountPage;
