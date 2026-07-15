import { classNames } from "@/lib/classNames";

interface ProfileInfoCardActionsProps {
  isSaving: boolean;
  onDiscard: () => void;
  onSave: () => void;
}

const ProfileInfoCardActions = ({ isSaving, onDiscard, onSave }: ProfileInfoCardActionsProps) => (
  <div className="mt-3.5 flex justify-end gap-2 md:mt-[18px] md:gap-3">
    <button type="button" onClick={onDiscard} className={classNames("muted")}>
      Discard
    </button>
    <button
      type="button"
      onClick={onSave}
      disabled={isSaving}
      className="rounded-full border border-grey-moss-900 bg-grey-moss-900 px-3.5 py-[7px] font-archivo-medium text-[11.5px] text-white hover:bg-black md:px-[18px] md:py-2 md:text-[12.5px]"
    >
      {isSaving ? "Saving..." : "Save"}
    </button>
  </div>
);

export default ProfileInfoCardActions;
