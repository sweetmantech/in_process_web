"use client";

import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import ExternalWalletButton from "@/components/ExternalWalletButton";
import PhoneButton from "./PhoneButton";
import { PhoneVerificationProvider } from "@/providers/PhoneVerificationProvider";
import { EmailVerificationProvider } from "@/providers/EmailVerificationProvider";
import AccountPageSkeleton from "./AccountPageSkeleton";
import SignToInProcess from "./SignToInProcess";
import ProfileForm from "./ProfileForm";
import ConnectionsCard from "./ConnectionsCard";
import useUpdateProfile from "@/hooks/useUpdateProfile";
import ConnectEmail from "@/components/ConnectEmail";

const AccountPage = () => {
  const { isMiniApp } = useMiniAppProvider();
  const { primaryWallet, walletsReady } = useWalletsProvider();
  const { isLoading, onSave } = useUpdateProfile();

  if (!walletsReady) return <AccountPageSkeleton />;
  if (!primaryWallet) return <SignToInProcess />;

  const connections = (
    <>
      <ConnectionsCard>
        {isMiniApp ? <ConnectEmail variant="row" /> : <ExternalWalletButton variant="row" />}
        <PhoneButton variant="row" />
      </ConnectionsCard>
      <section className="mt-4 hidden items-start justify-end gap-3 md:flex md:flex-row">
        <PhoneButton />
        {isMiniApp ? <ConnectEmail /> : <ExternalWalletButton />}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 md:mr-4 md:w-fit md:min-w-[100px]"
          onClick={onSave}
          disabled={isLoading}
        >
          {isLoading ? "saving..." : "save"}
        </button>
      </section>
    </>
  );

  return (
    <main className="flex flex-col gap-3 pb-6 font-archivo md:gap-0 md:pb-0">
      <ProfileForm />
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
