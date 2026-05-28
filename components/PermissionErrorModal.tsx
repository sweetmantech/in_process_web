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
  const { grantPermission, isGranting } = useInProcessGrantPermission(contractAddress);

  const handleGrant = async () => {
    await grantPermission();
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Permission Required</DialogTitle>
          <DialogDescription>
            The In·Process smart wallet does not have permission. Use your external wallet to
            directly add permission onchain.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose} disabled={isGranting}>
            Cancel
          </Button>
          <Button
            className="bg-black text-grey-eggshell"
            onClick={handleGrant}
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
