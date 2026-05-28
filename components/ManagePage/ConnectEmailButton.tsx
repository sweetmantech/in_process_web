"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { useEmailVerificationProvider } from "@/providers/EmailVerificationProvider";
import { EMAIL_VERIFICATION_STATUS } from "@/types/email";
import EmailAddressInput from "./EmailAddressInput";
import EmailCodeInput from "./EmailCodeInput";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import DisconnectButton from "./DisconnectButton";
import { Fragment } from "react";

const ConnectEmailButton = () => {
  const { isDialogOpen, setIsDialogOpen, status } = useEmailVerificationProvider();
  const { hasEOA, primaryWallet } = useWalletsProvider();

  if (!primaryWallet) return <Fragment />;
  if (hasEOA) {
    return <DisconnectButton label="disconnect email" />;
  }

  return (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>
        <button
          type="button"
          className="flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 md:w-fit md:min-w-[150px]"
        >
          connect email
        </button>
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
  );
};

export default ConnectEmailButton;
