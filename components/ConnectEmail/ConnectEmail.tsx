"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Mail } from "lucide-react";
import { useEmailVerificationProvider } from "@/providers/EmailVerificationProvider";
import { EMAIL_VERIFICATION_STATUS } from "@/types/email";
import EmailAddressInput from "../ManagePage/EmailAddressInput";
import EmailCodeInput from "../ManagePage/EmailCodeInput";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import truncateAddress from "@/lib/truncateAddress";
import DisconnectButton from "@/components/ExternalWalletButton/DisconnectButton";
import { Fragment } from "react";
import ConnectButton from "./ConnectButton";
import ConnectionItem from "../ManagePage/ConnectionItem";

const ConnectEmail = () => {
  const { isDialogOpen, setIsDialogOpen, status } = useEmailVerificationProvider();
  const { primaryWallet, wallets } = useWalletsProvider();
  const privy = wallets.find((w) => w.type === "privy");

  if (!primaryWallet) return <Fragment />;

  if (privy) {
    return (
      <ConnectionItem icon={Mail} label="Email" connected meta={truncateAddress(privy.address)}>
        <DisconnectButton />
      </ConnectionItem>
    );
  }

  return (
    <ConnectionItem icon={Mail} label="Email" connected={false} meta="Not connected">
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <ConnectButton />
        </DialogTrigger>
        <DialogContent className="flex max-w-xl flex-col items-center !gap-0 overflow-hidden !rounded-3xl border-none !bg-white bg-transparent px-8 py-10 shadow-lg">
          <VisuallyHidden>
            <DialogTitle>Connect Email</DialogTitle>
          </VisuallyHidden>
          {status === EMAIL_VERIFICATION_STATUS.ENTER_EMAIL && <EmailAddressInput />}
          {status === EMAIL_VERIFICATION_STATUS.ENTER_CODE && <EmailCodeInput />}
          {status === EMAIL_VERIFICATION_STATUS.VERIFIED && (
            <p className="text-center font-archivo text-grey-moss-900">
              Your email has been verified.
            </p>
          )}
        </DialogContent>
      </Dialog>
    </ConnectionItem>
  );
};

export default ConnectEmail;
