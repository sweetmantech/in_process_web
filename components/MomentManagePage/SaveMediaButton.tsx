"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import CollectionChangeWarningModal from "./CollectionChangeWarningModal";
import PermissionErrorModal from "@/components/PermissionErrorModal";
import { useMomentEditProvider } from "@/providers/MomentEditProvider";
import useSaveMomentButton from "@/hooks/useSaveMomentButton";

const SaveMediaButton = () => {
  const { moment } = useMomentProvider();
  const {
    showPermissionModal,
    closePermissionModal,
    showCollectionWarningModal,
    cancelCollectionChanging,
  } = useMomentEditProvider();
  const { isDisabled, handleSave, handleConfirm, isSaving } = useSaveMomentButton();

  return (
    <div>
      <button
        className="w-fit rounded-md bg-black px-4 md:px-8 md:py-2 py-1 text-grey-eggshell transition-colors hover:bg-grey-moss-300 disabled:opacity-50"
        onClick={handleSave}
        disabled={isDisabled}
      >
        {isSaving ? "Saving..." : "Save"}
      </button>
      <CollectionChangeWarningModal
        open={showCollectionWarningModal}
        onConfirm={handleConfirm}
        onCancel={cancelCollectionChanging}
      />
      <PermissionErrorModal
        open={showPermissionModal}
        onClose={closePermissionModal}
        contractAddress={moment.collectionAddress}
      />
    </div>
  );
};

export default SaveMediaButton;
