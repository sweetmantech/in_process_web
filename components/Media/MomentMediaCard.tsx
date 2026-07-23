"use client";

import { useMomentProvider } from "@/providers/MomentProvider";
import { useMomentEditProvider } from "@/providers/MomentEditProvider";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import useMomentMedia from "@/hooks/useMomentMedia";
import CollectionsDropdown from "@/components/Collections/CollectionsDropdown";
import CollectionChangeWarningModal from "@/components/MomentManagePage/CollectionChangeWarningModal";
import PermissionErrorModal from "@/components/PermissionErrorModal";
import MomentMediaCover from "./MomentMediaCover";
import TitleInput from "./TitleInput";
import DescriptionInput from "./DescriptionInput";

const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";

const MomentMediaCard = () => {
  const { moment, metadata } = useMomentProvider();
  const {
    showPermissionModal,
    closePermissionModal,
    showCollectionWarningModal,
    closeCollectionWarningModal,
  } = useMomentEditProvider();
  const { setSelectedCollection } = useCollectionsProvider();
  const {
    isOwner,
    isSaving,
    isDisabled,
    dirty,
    showActions,
    onSave,
    onDiscard,
    onConfirmCollectionChange,
    stats,
  } = useMomentMedia();

  return (
    <div className="rounded-lg border border-grey-moss-100 bg-white p-4 md:p-6 shadow-sm">
      <div className="mb-[18px] flex items-center gap-1.5">
        <span className="size-1.5 rounded-full bg-tan" />
        <span className={FIELD_LABEL_CLASS}>media</span>
      </div>

      <div className="flex flex-col items-center gap-5 md:flex-row md:items-center">
        <MomentMediaCover metadata={metadata} isOwner={isOwner} isSaving={isSaving} />
        <div className="flex w-full min-w-0 flex-1 flex-col gap-3.5">
          <div className="flex flex-col gap-1">
            <label className={FIELD_LABEL_CLASS}>collection</label>
            <CollectionsDropdown
              disabled={!isOwner || isSaving}
              className="rounded-md border-grey-moss-100 !font-archivo text-[15px]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={FIELD_LABEL_CLASS}>title</label>
            <TitleInput
              disabled={!isOwner || isSaving}
              labelHidden
              inputClassName="rounded-md border-grey-moss-100 font-archivo text-[15px]"
            />
          </div>
          <div className="flex flex-col gap-1">
            <label className={FIELD_LABEL_CLASS}>description</label>
            <DescriptionInput
              disabled={!isOwner || isSaving}
              labelHidden
              textareaClassName="rounded-md border-grey-moss-100 font-archivo text-sm"
            />
          </div>
        </div>
      </div>

      <div className="mt-[18px] flex gap-6 border-t border-grey-moss-50 pt-4">
        {stats.map((s) => (
          <div key={s.label}>
            <div className="font-spectral text-[19px] leading-none text-grey-moss-900">
              {s.value}
            </div>
            <div className="mt-1 font-archivo text-[10px] uppercase tracking-wider text-grey-moss-200">
              {s.label}
            </div>
          </div>
        ))}
      </div>

      {showActions && (
        <div className="mt-[18px] flex items-center justify-end gap-3">
          <button
            type="button"
            onClick={onDiscard}
            disabled={isSaving}
            className="rounded-full border border-grey-moss-100 px-[18px] py-2 font-archivo-medium text-xs text-grey-moss-300 transition-colors hover:border-grey-moss-300 hover:text-grey-moss-900 disabled:opacity-50"
          >
            discard
          </button>
          <button
            type="button"
            onClick={onSave}
            disabled={isSaving || isDisabled || !dirty}
            className="rounded-full border border-grey-moss-900 bg-grey-moss-900 px-[18px] py-2 font-archivo-medium text-xs text-white transition-colors hover:bg-black disabled:opacity-50"
          >
            {isSaving ? "Saving..." : "Save Changes"}
          </button>
        </div>
      )}

      <CollectionChangeWarningModal
        open={showCollectionWarningModal}
        onConfirm={onConfirmCollectionChange}
        onCancel={() => {
          setSelectedCollection(moment.collectionAddress);
          closeCollectionWarningModal();
        }}
      />
      <PermissionErrorModal
        open={showPermissionModal}
        onClose={closePermissionModal}
        contractAddress={moment.collectionAddress}
      />
    </div>
  );
};

export default MomentMediaCard;
