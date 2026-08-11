import { Controller } from "react-hook-form";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";

const TotalSupplyInput = () => {
  const { form } = useMetadataFormProvider();

  return (
    <div>
      <label className="mb-1 block font-archivo-medium text-[10.5px] uppercase tracking-[0.14em] text-[#A8A296]">
        total supply
      </label>
      <Controller
        name="totalSupply"
        control={form.control}
        render={({ field }) => (
          <input
            type="number"
            min={1}
            placeholder="Leave empty for open edition"
            value={field.value === undefined ? "" : field.value}
            onChange={(e) => {
              const value = e.target.value;
              if (value === "") {
                field.onChange(undefined);
              } else {
                const num = parseInt(value, 10);
                if (!isNaN(num) && num >= 1) {
                  field.onChange(num);
                }
              }
            }}
            onBlur={field.onBlur}
            className="w-full border-0 border-b-[1.5px] border-[#DCD6CA] bg-transparent px-0.5 py-[9px] font-archivo text-[15px] text-grey-moss-900 outline-none transition-colors placeholder:text-[#B4AEA2] focus:border-grey-moss-900"
          />
        )}
      />
      {form.formState.errors.totalSupply && (
        <p className="mt-1 font-archivo text-xs text-red-500">
          {form.formState.errors.totalSupply.message}
        </p>
      )}
    </div>
  );
};

export default TotalSupplyInput;
