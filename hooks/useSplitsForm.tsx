import { useLayoutEffect, useRef } from "react";
import { useFieldArray } from "react-hook-form";
import useSplitAddressHandler from "@/hooks/useSplitAddressHandler";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import type { SplitRecipientInput } from "@/lib/splits/createSplit";

const useSplitsForm = (chainRecipients?: SplitRecipientInput[]) => {
  const { form } = useMetadataFormProvider();
  const hydratedKey = useRef<string | null>(null);

  const { fields, append, remove, replace } = useFieldArray({
    control: form.control,
    name: "splits",
  });

  useLayoutEffect(() => {
    if (!chainRecipients?.length) {
      if (hydratedKey.current !== null) {
        hydratedKey.current = null;
        replace([]);
      }
      return;
    }
    const key = chainRecipients
      .map((recipient) => `${recipient.address.toLowerCase()}:${recipient.percentAllocation}`)
      .join(",");
    if (hydratedKey.current === key) return;
    hydratedKey.current = key;
    replace(chainRecipients);
  }, [chainRecipients, replace]);

  const { handleAddressChange } = useSplitAddressHandler({
    setValue: form.setValue,
    setError: form.setError,
    clearErrors: form.clearErrors,
  });

  const handleAddSplit = () => {
    append({ address: "", percentAllocation: 0 });
    setTimeout(() => form.trigger("splits"), 0);
  };

  const handleRemoveSplit = (index: number) => {
    remove(index);
    setTimeout(() => form.trigger("splits"), 0);
  };

  return {
    form,
    fields,
    handleAddressChange,
    handleAddSplit,
    handleRemoveSplit,
  };
};

export default useSplitsForm;
