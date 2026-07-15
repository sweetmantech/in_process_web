import { DateTimePicker } from "@/components/ui/date-time-picker";
import { isOpenEndedSale } from "@/lib/moment/isOpenEndedSale";

interface SaleEndPickerProps {
  saleEnd: Date | undefined;
  currentSaleEnd: number | string;
  setSaleEnd: (date: Date) => void;
  saleStart: Date;
}

const SaleEndPicker = ({ saleEnd, currentSaleEnd, setSaleEnd, saleStart }: SaleEndPickerProps) => {
  const isOpenEnded = isOpenEndedSale(currentSaleEnd);
  return (
    <div>
      <p className="pb-2">
        sale end:{" "}
        {isOpenEnded ? "Open" : new Date(Number(currentSaleEnd) * 1000).toLocaleDateString()}
      </p>
      <DateTimePicker date={saleEnd} setDate={setSaleEnd} minDate={saleStart} />
    </div>
  );
};

export default SaleEndPicker;
