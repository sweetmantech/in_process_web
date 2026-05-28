"use client";

import useSaveCollectionButton from "@/hooks/useSaveCollectionButton";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import PermissionErrorModal from "@/components/PermissionErrorModal";
import { Address } from "viem";

export interface SaveCollectionButtonProps {
  onSuccess?: () => void;
}

const SaveCollectionButton = (props: SaveCollectionButtonProps) => {
  const { isSaving, isDisabled, onSave, showPermissionModal, closePermissionModal } =
    useSaveCollectionButton(props);
  const { data } = useCollectionProvider();

  return (
    <div>
      <button
        className="w-fit rounded-md bg-black px-8 py-2 text-grey-eggshell transition-colors hover:bg-grey-moss-300 disabled:opacity-50"
        onClick={onSave}
        disabled={isSaving || isDisabled}
      >
        {isSaving ? "saving..." : "save"}
      </button>
      <PermissionErrorModal
        open={showPermissionModal}
        onClose={closePermissionModal}
        contractAddress={data?.address as Address | undefined}
      />
    </div>
  );
};

export default SaveCollectionButton;
