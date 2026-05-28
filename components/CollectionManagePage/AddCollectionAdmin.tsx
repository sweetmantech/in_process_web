"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAddCollectionAdmin from "@/hooks/useAddCollectionAdmin";
import useIsCollectionOwner from "@/hooks/useIsCollectionOwner";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import PermissionErrorModal from "@/components/PermissionErrorModal";
import { Address } from "viem";

const AddCollectionAdmin = () => {
  const {
    newAdminAddress,
    setNewAdminAddress,
    handleAddAdmin,
    isAdding,
    showPermissionModal,
    closePermissionModal,
  } = useAddCollectionAdmin();
  const isOwner = useIsCollectionOwner();
  const { data } = useCollectionProvider();

  const isDisabled = isAdding || !isOwner;

  return (
    <div className="flex flex-col gap-2 border-t border-grey-secondary pt-4">
      <h3 className="font-archivo-medium text-lg">Add New Admin</h3>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter admin address or ENS name (0x... or name.eth)"
          value={newAdminAddress}
          onChange={(e) => setNewAdminAddress(e.target.value)}
          disabled={isDisabled}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleAddAdmin}
          disabled={!newAdminAddress.trim() || isDisabled}
          className="w-fit rounded-md bg-black px-8 py-2 text-grey-eggshell disabled:opacity-50"
        >
          {isAdding ? "Adding..." : "Add"}
        </Button>
      </div>
      <PermissionErrorModal
        open={showPermissionModal}
        onClose={closePermissionModal}
        contractAddress={data?.address as Address | undefined}
      />
    </div>
  );
};

export default AddCollectionAdmin;
