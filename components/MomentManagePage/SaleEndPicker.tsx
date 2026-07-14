import { maxUint64 } from "viem";
import { DateTimePicker } from "@/components/ui/date-time-picker";

interface SaleEndPickerProps {
  saleEnd: Date | undefined;
  currentSaleEnd: number | string;
  setSaleEnd: (date: Date) => void;
}

const SaleEndPicker = ({ saleEnd, currentSaleEnd, setSaleEnd }: SaleEndPickerProps) => {
  const normalized = BigInt(String(Math.floor(Number(currentSaleEnd))));
  const isOpenEnded = normalized === BigInt(0) || normalized === maxUint64;
  return (
    <div>
      <p className="pb-2">
        sale end:{" "}
        {isOpenEnded ? "Open" : new Date(Number(normalized) * 1000).toLocaleDateString()}
      </p>
      <DateTimePicker date={saleEnd} setDate={setSaleEnd} />
    </div>
  );
};

export default SaleEndPicker;
