import { DateTimePicker } from "@/components/ui/date-time-picker";

const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";
const PICKER_CLASS =
  "!rounded-md !border-grey-moss-100 !font-archivo text-[15px] text-grey-moss-900 hover:!bg-white";

interface SaleStartPickerProps {
  saleStart: Date;
  currentSaleStart: number | string;
  setSaleStart: (date: Date) => void;
  disabled?: boolean;
}

const SaleStartPicker = ({
  saleStart,
  currentSaleStart,
  setSaleStart,
  disabled = false,
}: SaleStartPickerProps) => {
  const normalized = BigInt(String(Math.floor(Number(currentSaleStart))));
  const currentLabel =
    normalized === BigInt(0)
      ? "Open"
      : new Date(Number(normalized) * 1000).toLocaleDateString();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2">
        <label className={FIELD_LABEL_CLASS}>sale start</label>
        <span className="font-archivo text-[10.5px] text-grey-moss-200">
          current · {currentLabel}
        </span>
      </div>
      <DateTimePicker
        date={saleStart}
        setDate={setSaleStart}
        disabled={disabled}
        className={PICKER_CLASS}
      />
    </div>
  );
};

export default SaleStartPicker;
