"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Smartphone } from "lucide-react";
import { usePhoneVerificationProvider } from "@/providers/PhoneVerificationProvider";
import { PHONE_VERIFICATION_STATUS } from "@/types/phone";
import PhoneNumberInput from "./PhoneNumberInput";
import DisconnectPhone from "./DisconnectPhone";
import ConnectionRow from "./ConnectionRow";
import { useUserProvider } from "@/providers/UserProvider";

interface PhoneButtonProps {
  variant?: "pill" | "row";
}

const PhoneButton = ({ variant = "pill" }: PhoneButtonProps) => {
  const {
    status,
    setIsDialogOpen,
    isDialogOpen,
    phoneNumber: pendingPhoneNumber,
  } = usePhoneVerificationProvider();
  const { phoneVerified } = useUserProvider();

  if (phoneVerified) {
    return <DisconnectPhone variant={variant} />;
  }

  const trigger =
    variant === "row" ? (
      <button
        type="button"
        className="rounded-full border border-grey-moss-100 bg-white px-3.5 py-[7px] font-archivo-medium text-[11.5px] text-grey-moss-900 hover:border-grey-moss-300"
      >
        Connect
      </button>
    ) : (
      <button
        type="button"
        className="flex w-full items-center justify-center gap-2 rounded-md bg-grey-moss-900 py-2 font-archivo text-grey-eggshell hover:bg-grey-eggshell hover:text-grey-moss-900 md:w-fit md:min-w-[150px]"
      >
        connect phone
      </button>
    );

  const dialog = (
    <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="flex max-w-xl flex-col items-center !gap-0 overflow-hidden !rounded-3xl border-none !bg-white bg-transparent px-8 py-10 shadow-lg">
        <VisuallyHidden>
          <DialogTitle>Connect Phone</DialogTitle>
        </VisuallyHidden>
        {status === PHONE_VERIFICATION_STATUS.READY_TO_VERIFY && <PhoneNumberInput />}
        {status === PHONE_VERIFICATION_STATUS.CONFIRMING && (
          <p className="text-center">
            A verification message has been sent to{" "}
            <span className="font-semibold">{pendingPhoneNumber || "your phone"}</span>. Please
            check your messages.
          </p>
        )}
        {status === PHONE_VERIFICATION_STATUS.VERIFIED && (
          <p>Your phone number has been verified</p>
        )}
      </DialogContent>
    </Dialog>
  );

  if (variant === "row") {
    return (
      <ConnectionRow icon={Smartphone} label="Phone" connected={false} meta="Not connected" isLast>
        {dialog}
      </ConnectionRow>
    );
  }

  return dialog;
};

export default PhoneButton;
