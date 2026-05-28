"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAddMomentAdmin from "@/hooks/useAddMomentAdmin";
import { useMomentProvider } from "@/providers/MomentProvider";
import PermissionErrorModal from "@/components/PermissionErrorModal";

const AddAdmin = () => {
  const {
    newAdminAddress,
    setNewAdminAddress,
    handleAddAdmin,
    isAdding,
    showPermissionModal,
    closePermissionModal,
  } = useAddMomentAdmin();
  const { isOwner, moment } = useMomentProvider();

  return (
    <div className="flex flex-col gap-2 border-t border-grey-secondary pt-4">
      <h3 className="font-archivo-medium text-lg">Add New Admin</h3>
      <div className="flex gap-2">
        <Input
          type="text"
          placeholder="Enter admin address or ENS name (0x... or name.eth)"
          value={newAdminAddress}
          onChange={(e) => setNewAdminAddress(e.target.value)}
          disabled={isAdding || !isOwner}
          className="flex-1"
        />
        <Button
          type="button"
          onClick={handleAddAdmin}
          disabled={!newAdminAddress.trim() || isAdding || !isOwner}
          className="w-fit rounded-md bg-black px-8 py-2 text-grey-eggshell disabled:opacity-50"
        >
          {isAdding ? "Adding..." : "Add"}
        </Button>
      </div>
      <PermissionErrorModal
        open={showPermissionModal}
        onClose={closePermissionModal}
        contractAddress={moment.collectionAddress}
      />
    </div>
  );
};

export default AddAdmin;
