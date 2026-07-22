"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Address } from "viem";
import useInProcessGrantPermission from "@/hooks/useInProcessGrantPermission";

interface PermissionErrorModalProps {
  open: boolean;
  onClose: () => void;
  contractAddress: Address | undefined;
}

const PermissionErrorModal = ({ open, onClose, contractAddress }: PermissionErrorModalProps) => {
  const { grantPermission, isGranting } = useInProcessGrantPermission(contractAddress, {
    onGranted: onClose,
  });

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Legacy Moment Permission Missing</DialogTitle>
          <DialogDescription>
            This is a legacy moment, so the In·Process smart wallet was never granted permission for
            it. Use your external wallet to add permission onchain directly.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isGranting}>
            Cancel
          </Button>
          <Button
            className="bg-black text-grey-eggshell"
            onClick={grantPermission}
            disabled={isGranting}
          >
            {isGranting ? "Granting..." : "Grant Permission"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PermissionErrorModal;
