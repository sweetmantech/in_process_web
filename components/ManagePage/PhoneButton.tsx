"use client";

import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Smartphone } from "lucide-react";
import { classNames } from "@/lib/classNames";
import { usePhoneVerificationProvider } from "@/providers/PhoneVerificationProvider";
import { PHONE_VERIFICATION_STATUS } from "@/types/phone";
import PhoneNumberInput from "./PhoneNumberInput";
import DisconnectPhone from "./DisconnectPhone";
import ConnectionItem from "./ConnectionItem";
import { useUserProvider } from "@/providers/UserProvider";

const PhoneButton = () => {
  const {
    status,
    setIsDialogOpen,
    isDialogOpen,
    phoneNumber: pendingPhoneNumber,
  } = usePhoneVerificationProvider();
  const { phoneVerified } = useUserProvider();

  if (phoneVerified) {
    return <DisconnectPhone />;
  }

  return (
    <ConnectionItem
      icon={Smartphone}
      label="Phone"
      connected={false}
      meta={
        <>
          Not connected<span className="hidden md:inline"> · used for creating moments</span>
        </>
      }
      isLast
    >
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogTrigger asChild>
          <button type="button" className={classNames()}>
            Connect
          </button>
        </DialogTrigger>
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
    </ConnectionItem>
  );
};

export default PhoneButton;
