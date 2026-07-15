interface ProfileInfoCardActionsProps {
  isSaving: boolean;
  onDiscard: () => void;
  onSave: () => void;
}

const ProfileInfoCardActions = ({ isSaving, onDiscard, onSave }: ProfileInfoCardActionsProps) => (
  <div className="mt-3.5 flex justify-end gap-2">
    <button
      type="button"
      onClick={onDiscard}
      className="rounded-full border border-grey-moss-100 bg-white px-3.5 py-[7px] font-archivo-medium text-[11.5px] text-grey-moss-300 hover:border-grey-moss-300 hover:text-grey-moss-900"
    >
      Discard
    </button>
    <button
      type="button"
      onClick={onSave}
      disabled={isSaving}
      className="rounded-full border border-grey-moss-900 bg-grey-moss-900 px-3.5 py-[7px] font-archivo-medium text-[11.5px] text-white hover:bg-black"
    >
      {isSaving ? "saving..." : "Save"}
    </button>
  </div>
);

export default ProfileInfoCardActions;
