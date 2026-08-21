"use client";

import { DateTimePicker } from "@/components/ui/date-time-picker";
import PermissionErrorModal from "@/components/PermissionErrorModal";
import { useMomentProvider } from "@/providers/MomentProvider";
import useSetTimelineVisibility from "@/hooks/useSetTimelineVisibility";

const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";
const PICKER_CLASS =
  "!rounded-md !border-grey-moss-100 !font-archivo text-[15px] text-grey-moss-900 hover:!bg-white";

interface TimelineVisibilityFieldProps {
  disabled?: boolean;
}

const TimelineVisibilityField = ({ disabled = false }: TimelineVisibilityFieldProps) => {
  const { moment } = useMomentProvider();
  const {
    timelineAt,
    setTimelineAt,
    currentSaleStart,
    hasSaleConfig,
    save,
    isLoading,
    showPermissionModal,
    closePermissionModal,
  } = useSetTimelineVisibility();

  if (!hasSaleConfig || currentSaleStart === undefined) return null;

  const normalized = BigInt(String(Math.floor(Number(currentSaleStart))));
  const currentLabel =
    normalized === BigInt(0) ? "Open" : new Date(Number(normalized) * 1000).toLocaleString();

  return (
    <div className="flex flex-col gap-1 border-t border-grey-moss-100 pt-3">
      <div className="flex items-center justify-between gap-2">
        <label className={FIELD_LABEL_CLASS}>timeline</label>
        <span className="font-archivo text-[10.5px] text-tan-gold">{currentLabel}</span>
      </div>
      <p className="font-archivo text-[11px] text-grey-moss-200">
        When this moment appears on the timeline
      </p>
      <DateTimePicker
        date={timelineAt}
        setDate={setTimelineAt}
        disabled={disabled || isLoading}
        className={PICKER_CLASS}
      />
      <div className="mt-2 flex items-center justify-end">
        <button
          type="button"
          onClick={save}
          disabled={disabled || isLoading}
          className="rounded-full border border-grey-moss-900 bg-grey-moss-900 px-[18px] py-1.5 font-archivo-medium text-xs text-white transition-colors hover:bg-black disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Update"}
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

export default TimelineVisibilityField;
