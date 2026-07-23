import { Input } from "@/components/ui/input";

const FIELD_LABEL_CLASS = "font-archivo text-[10.5px] uppercase tracking-wider text-grey-moss-300";

interface SalePriceInputProps {
  priceInput: string;
  priceUnit: string;
  disabled: boolean;
  setPriceInput: (value: string) => void;
}

const SalePriceInput = ({
  priceInput,
  priceUnit,
  disabled,
  setPriceInput,
}: SalePriceInputProps) => (
  <div className="flex flex-col gap-1">
    <label htmlFor="sale-price" className={FIELD_LABEL_CLASS}>
      price
    </label>
    <div className="flex overflow-hidden rounded-md border border-grey-moss-100">
      <Input
        id="sale-price"
        type="number"
        inputMode="decimal"
        min="0"
        step="0.01"
        value={priceInput}
        onChange={(e) => {
          const val = e.target.value;
          if (/^\d*\.?\d*$/.test(val)) setPriceInput(val);
        }}
        onWheel={(e) => e.currentTarget.blur()}
        className="flex-grow !rounded-none !border-none bg-white !font-archivo text-[15px] text-grey-moss-900 [appearance:textfield] focus-visible:ring-0 focus-visible:ring-offset-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
        disabled={disabled}
      />
      <div className="flex items-center bg-white">
        <div className="my-2 h-6 w-px bg-grey-moss-100" />
      </div>
      <div className="flex items-center bg-white px-3 font-archivo text-[13.5px] text-grey-moss-300">
        {priceUnit}
      </div>
    </div>
  </div>
);

export default SalePriceInput;
