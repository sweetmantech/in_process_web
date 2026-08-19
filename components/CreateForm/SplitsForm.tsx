"use client";

import { Plus, X } from "lucide-react";
import { Controller } from "react-hook-form";
import useSplitsForm from "@/hooks/useSplitsForm";
import type { SplitRecipientInput } from "@/lib/splits/createSplit";

const SplitsForm = ({ chainRecipients }: { chainRecipients?: SplitRecipientInput[] }) => {
  const { form, fields, handleAddressChange, handleAddSplit, handleRemoveSplit } =
    useSplitsForm(chainRecipients);

  return (
    <div className="w-full">
      <div className="mb-2.5 flex items-center justify-between">
        <label className="m-0 font-archivo-medium text-[10.5px] uppercase tracking-[0.14em] text-[#A8A296]">
          revenue splits
        </label>
        <button
          type="button"
          onClick={handleAddSplit}
          className="flex size-7 items-center justify-center rounded-lg bg-grey-moss-900 text-white"
        >
          <Plus className="size-[15px]" strokeWidth={1.75} />
        </button>
      </div>
      <div className="flex flex-col gap-2">
        {fields.map((field, index) => (
          <div key={field.id} className="flex flex-col gap-1">
            <div className="flex items-center gap-2">
              <div className="min-w-0 flex-1">
                <Controller
                  name={`splits.${index}.address`}
                  control={form.control}
                  render={({ field: formField }) => (
                    <input
                      type="text"
                      placeholder="address"
                      {...formField}
                      onChange={(e) => {
                        formField.onChange(e);
                        handleAddressChange(index, e.target.value);
                        form.trigger("splits");
                      }}
                      className={`w-full rounded-[9px] border bg-white px-3 py-2.5 font-archivo text-[13.5px] text-grey-moss-900 outline-none ${
                        form.formState.errors.splits?.[index]?.address
                          ? "border-red-500"
                          : "border-[#DCD6CA]"
                      }`}
                    />
                  )}
                />
                {form.formState.errors.splits?.[index]?.address && (
                  <p className="mt-1 font-archivo text-xs text-red-500">
                    {form.formState.errors.splits?.[index]?.address?.message}
                  </p>
                )}
              </div>
              <Controller
                name={`splits.${index}.percentAllocation`}
                control={form.control}
                render={({ field: formField }) => (
                  <input
                    type="number"
                    placeholder="%"
                    min="0"
                    max="100"
                    step="0.01"
                    {...formField}
                    value={formField.value || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      const numValue = val === "" ? 0 : parseFloat(val);
                      if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
                        formField.onChange(numValue);
                        form.trigger("splits");
                      }
                    }}
                    className="w-14 shrink-0 rounded-[9px] border border-[#DCD6CA] bg-white px-2.5 py-2.5 text-center font-archivo text-[13.5px] text-grey-moss-900 outline-none"
                  />
                )}
              />
              <button
                type="button"
                onClick={() => handleRemoveSplit(index)}
                className="flex size-[34px] shrink-0 items-center justify-center rounded-lg bg-grey-moss-900 text-white"
              >
                <X className="size-[15px]" strokeWidth={1.75} />
              </button>
            </div>
          </div>
        ))}
      </div>
      {fields.length > 0 && form.formState.errors.splits && (
        <p className="mt-2 font-archivo text-xs text-[#AA2E2E]">
          {form.formState.errors.splits.message}
        </p>
      )}
    </div>
  );
};

export default SplitsForm;
