"use client";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { useWithdraw } from "@/hooks/useWithdraw";
import { TotalBalances } from "./TotalBalances";
import { SmartWalletAddress } from "./SmartWalletAddress";
import { WithdrawForm } from "./WithdrawForm";

export function WithdrawModal() {
  const withdrawState = useWithdraw();
  const { isOpen, setIsOpen } = withdrawState;

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button
          onClick={() => setIsOpen(true)}
          className="inline-flex h-auto items-center gap-2 rounded-xl bg-grey-moss-900 px-[22px] py-[13px] font-archivo-bold text-sm text-white hover:bg-black"
        >
          <ArrowUpRight className="size-4" />
          withdraw
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md z-[9999999] max-h-[90vh] flex flex-col">
        <DialogHeader className="space-y-1 flex-shrink-0">
          <DialogTitle className="text-lg font-archivo-bold text-grey-moss-900">
            Withdraw from Smart Wallet
          </DialogTitle>
          <DialogDescription className="text-xs font-spectral-italic text-grey-secondary">
            Withdraw funds from your smart wallet to an external address.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 overflow-y-auto flex-1 min-h-0">
          <TotalBalances />
          <SmartWalletAddress />
          <WithdrawForm {...withdrawState} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
