import { useWatch } from "react-hook-form";
import { useQuery } from "@tanstack/react-query";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useIsSplitContract from "@/hooks/useIsSplitContract";
import getSplitRecipients from "@/lib/splits/getSplitRecipients";
import type { SplitRecipientInput } from "@/lib/splits/createSplit";

const areSplitsEqual = (a?: SplitRecipientInput[], b?: SplitRecipientInput[]) => {
  if (!a || !b || a.length !== b.length) return false;
  return a.every(
    (row, i) =>
      row.address.toLowerCase() === b[i].address.toLowerCase() &&
      row.percentAllocation === b[i].percentAllocation
  );
};

const useLoadSplitRecipients = () => {
  const { moment } = useMomentProvider();
  const { form } = useMetadataFormProvider();
  const { isSplit, fundsRecipient } = useIsSplitContract();
  const formSplits = useWatch({ control: form.control, name: "splits" });

  const { data: recipients } = useQuery({
    queryKey: ["splitRecipients", fundsRecipient, moment.chainId],
    queryFn: () => getSplitRecipients(fundsRecipient!, moment.chainId),
    enabled: Boolean(fundsRecipient) && isSplit === true,
    staleTime: Infinity,
    refetchOnWindowFocus: false,
  });

  const hasSplitsChanged = Boolean(recipients) && !areSplitsEqual(formSplits, recipients);

  return {
    recipients,
    showCreate: isSplit !== true || hasSplitsChanged,
  };
};

export default useLoadSplitRecipients;
