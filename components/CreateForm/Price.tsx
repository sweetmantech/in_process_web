"use client";

import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import CurrencySelect from "./CurrencySelect";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

export default function Price() {
  const { form } = useMetadataFormProvider();
  const { creating } = useMomentCreateProvider();
  const { isCreating } = useBulkCreateProvider();
  const isDisabled = Boolean(creating) || isCreating;

  return (
    <div className="w-full">
      <label
        htmlFor="price"
        className="mb-1 block font-archivo-medium text-[10.5px] uppercase tracking-[0.14em] text-[#A8A296]"
      >
        price
      </label>
      <div className="flex items-center gap-2.5 border-b-[1.5px] border-[#DCD6CA] px-0.5 pb-2 pt-1">
        <input
          id="price"
          type="number"
          inputMode="decimal"
          min="0"
          step="0.01"
          {...form.register("price", {
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
              const val = e.target.value;
              if (/^\d*\.?\d*$/.test(val)) {
                form.setValue("price", val, { shouldValidate: true });
              }
            },
          })}
          onWheel={(e) => {
            e.currentTarget.blur();
          }}
          className="min-w-0 flex-1 border-none bg-transparent font-archivo-bold text-[26px] tracking-[-0.01em] text-grey-moss-900 outline-none [appearance:textfield] focus:ring-0 [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
          disabled={isDisabled}
        />
        <CurrencySelect />
      </div>
      {form.formState.errors.price && (
        <p className="mt-1 font-archivo text-xs text-red-500">
          {form.formState.errors.price.message}
        </p>
      )}
    </div>
  );
}
