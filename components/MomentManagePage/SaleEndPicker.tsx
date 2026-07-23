import { DateTimePicker } from "@/components/ui/date-time-picker";
import { isOpenEndedSale } from "@/lib/moment/isOpenEndedSale";

const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";
const PICKER_CLASS =
  "!rounded-md !border-grey-moss-100 !font-archivo text-[15px] text-grey-moss-900 hover:!bg-white";

interface SaleEndPickerProps {
  saleEnd: Date | undefined;
  currentSaleEnd: number | string;
  setSaleEnd: (date: Date) => void;
  saleStart: Date;
  disabled?: boolean;
}

const SaleEndPicker = ({
  saleEnd,
  currentSaleEnd,
  setSaleEnd,
  saleStart,
  disabled = false,
}: SaleEndPickerProps) => {
  const isOpenEnded = isOpenEndedSale(currentSaleEnd);
  const currentLabel = isOpenEnded
    ? "Open"
    : new Date(Number(currentSaleEnd) * 1000).toLocaleDateString();

  return (
    <div className="flex flex-col gap-1">
      <div className="flex items-center justify-between gap-2">
        <label className={FIELD_LABEL_CLASS}>sale end</label>
        <span className="font-archivo text-[10.5px] text-grey-moss-200">
          current · {currentLabel}
        </span>
      </div>
      <DateTimePicker
        date={saleEnd}
        setDate={setSaleEnd}
        minDate={saleStart}
        disabled={disabled}
        className={PICKER_CLASS}
      />
    </div>
  );
};

export default SaleEndPicker;
