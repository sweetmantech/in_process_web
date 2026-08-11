import { Button } from "../ui/button";
import { DateTimePicker } from "../ui/date-time-picker";
import { ChevronDown, ChevronUp } from "lucide-react";
import SplitsForm from "./SplitsForm";
import { Controller } from "react-hook-form";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import TotalSupplyInput from "./TotalSupplyInput";

const Advanced = () => {
  const { isOpenAdvanced, form, setIsOpenAdvanced } = useMetadataFormProvider();

  return (
    <div className="z-10 flex flex-col">
      <Button
        type="button"
        className="mb-0 flex h-fit w-full items-center justify-between self-center rounded-none border-0 p-0 py-0 pb-1 font-archivo-medium text-[11px] uppercase tracking-[0.14em] text-[#6B6456] hover:bg-transparent"
        onClick={() => setIsOpenAdvanced(!isOpenAdvanced)}
      >
        advanced
        {isOpenAdvanced ? (
          <ChevronUp className="size-[17px] text-[#6B6456]" strokeWidth={1.75} />
        ) : (
          <ChevronDown className="size-[17px] text-[#6B6456]" strokeWidth={1.75} />
        )}
      </Button>
      {isOpenAdvanced && (
        <div className="relative flex flex-col gap-[22px] py-3.5">
          <TotalSupplyInput />
          <div>
            <label className="mb-1 block font-archivo-medium text-[10.5px] uppercase tracking-[0.14em] text-[#A8A296]">
              mint time
            </label>
            <Controller
              name="startDate"
              control={form.control}
              render={({ field }) => (
                <DateTimePicker date={field.value} setDate={(date) => field.onChange(date)} />
              )}
            />
          </div>
          <SplitsForm />
        </div>
      )}
    </div>
  );
};

export default Advanced;
