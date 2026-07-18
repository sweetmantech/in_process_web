"use client";

import { Input } from "@/components/ui/input";
import useAddCollectionAdmin from "@/hooks/useAddCollectionAdmin";
import useIsCollectionOwner from "@/hooks/useIsCollectionOwner";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import PermissionErrorModal from "@/components/PermissionErrorModal";
import { Address } from "viem";

const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";

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
  const hasValue = Boolean(newAdminAddress.trim());

  return (
    <div>
      <div className="mb-3 flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-[#887bff]" />
        <span className={FIELD_LABEL_CLASS}>add new admin</span>
      </div>
      <div className="flex gap-2.5">
        <Input
          type="text"
          placeholder="Admin address or ENS name (0x… or name.eth)"
          value={newAdminAddress}
          onChange={(e) => setNewAdminAddress(e.target.value)}
          disabled={isDisabled}
          className="min-w-0 flex-1 rounded-md border-grey-moss-100 bg-white font-archivo text-[13.5px] text-grey-moss-900 placeholder:text-grey-moss-200"
        />
        <button
          type="button"
          onClick={handleAddAdmin}
          disabled={!hasValue || isDisabled}
          className={`shrink-0 rounded-full border px-[18px] py-2 font-archivo text-xs font-semibold transition-colors disabled:opacity-50 ${
            hasValue
              ? "border-grey-moss-900 bg-grey-moss-900 text-white hover:bg-black"
              : "border-grey-moss-100 bg-grey-moss-50 text-grey-moss-300"
          }`}
        >
          {isAdding ? "Adding..." : "Add"}
        </button>
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
