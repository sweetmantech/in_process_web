"use client";

import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

export default function CurrencySelect() {
  const { form } = useMetadataFormProvider();
  const { creating } = useMomentCreateProvider();
  const { isCreating } = useBulkCreateProvider();

  return (
    <select
      {...form.register("priceUnit")}
      disabled={Boolean(creating) || isCreating}
      className="h-auto min-w-[70px] cursor-pointer appearance-none !rounded-[0px] !border-none bg-white px-3 py-0 text-center font-spectral focus-visible:ring-0 focus-visible:ring-offset-0"
    >
      <option value="eth">ETH</option>
      <option value="usdc">USD</option>
    </select>
  );
}
