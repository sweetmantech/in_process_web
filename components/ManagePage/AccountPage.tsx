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
import useUpdateProfile from "@/hooks/useUpdateProfile";
import ConnectEmail from "@/components/ConnectEmail";

const AccountPage = () => {
  const { isMiniApp } = useMiniAppProvider();
  const { primaryWallet, walletsReady } = useWalletsProvider();
  const { isLoading, onSave } = useUpdateProfile();

  if (!walletsReady) return <AccountPageSkeleton />;
  if (!primaryWallet) return <SignToInProcess />;

  return (
    <main className="flex flex-col font-archivo">
      <ProfileForm />
      <section className="mt-4 flex flex-col items-start justify-end gap-3 md:flex-row">
        <PhoneVerificationProvider>
          <PhoneButton />
        </PhoneVerificationProvider>
        {isMiniApp ? (
          <EmailVerificationProvider>
            <ConnectEmail />
          </EmailVerificationProvider>
        ) : (
          <ExternalWalletButton />
        )}
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 md:mr-4 md:w-fit md:min-w-[100px]"
          onClick={onSave}
          disabled={isLoading}
        >
          {isLoading ? "saving..." : "save"}
        </button>
      </section>
    </main>
  );
};

export default AccountPage;
