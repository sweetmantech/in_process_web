"use client";

import SplitsForm from "@/components/CreateForm/SplitsForm";
import PermissionErrorModal from "@/components/PermissionErrorModal";
import useManageSplits from "@/hooks/useManageSplits";
import { useMomentProvider } from "@/providers/MomentProvider";
import FundsRecipientHint from "./FundsRecipientHint";

const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";

const Splits = () => {
  const {
    handleCreate,
    handleDistribute,
    isCreating,
    isDistributing,
    isSplit,
    showPermissionModal,
    closePermissionModal,
  } = useManageSplits();
  const { isOwner, moment } = useMomentProvider();

  const isBusy = isCreating || isDistributing;
  const isDisabled = isBusy || !isOwner;
  const isDistributeDisabled = isDisabled || isSplit !== true;

  return (
    <div className="rounded-lg border border-grey-moss-100 bg-white p-4 shadow-sm md:p-6">
      <div className="mb-4 flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-[#887bff]" />
        <span className={FIELD_LABEL_CLASS}>splits</span>
      </div>

      <FundsRecipientHint />

      <SplitsForm />

      <div className="mt-[18px] flex items-center justify-end gap-3 border-t border-grey-moss-50 pt-4">
        <button
          type="button"
          onClick={handleDistribute}
          disabled={isDistributeDisabled}
          className="rounded-full border border-grey-moss-900 bg-white px-[18px] py-2 font-archivo-medium text-xs text-grey-moss-900 transition-colors hover:bg-grey-moss-50 disabled:opacity-50"
        >
          {isDistributing ? "Distributing..." : "Distribute"}
        </button>
        <button
          type="button"
          onClick={handleCreate}
          disabled={isDisabled}
          className="rounded-full border border-grey-moss-900 bg-grey-moss-900 px-[18px] py-2 font-archivo-medium text-xs text-white transition-colors hover:bg-black disabled:opacity-50"
        >
          {isCreating ? "Creating..." : "Create"}
        </button>
      </div>

      <PermissionErrorModal
        open={showPermissionModal}
        onClose={closePermissionModal}
        contractAddress={moment.collectionAddress}
      />
    </div>
  );
};

export default Splits;
