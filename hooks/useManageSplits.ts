import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { createSplit } from "@/lib/splits/createSplit";
import { setSale } from "@/lib/moment/setSale";
import { isPermissionError } from "@/lib/errors/isPermissionError";
import useIsSplitContract from "@/hooks/useIsSplitContract";

const useManageSplits = () => {
  const { moment, fetchMomentData } = useMomentProvider();
  const { isSplit } = useIsSplitContract();
  const { form } = useMetadataFormProvider();
  const { getAccessToken } = usePrivy();
  const [isCreating, setIsCreating] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const handleCreate = async () => {
    const isValid = await form.trigger("splits");
    const splits = form.getValues("splits");
    if (!isValid) {
      toast.error(form.formState.errors.splits?.message || "Splits validation failed");
      return;
    }
    if (!splits || splits.length < 2) {
      toast.error("Splits must have at least 2 recipients");
      return;
    }

    setIsCreating(true);
    try {
      const accessToken = await getAccessToken();
      if (!accessToken) throw new Error("Authentication required");

      const { splitAddress } = await createSplit(accessToken, splits);
      await setSale(accessToken, moment, { fundsRecipient: splitAddress });
      await fetchMomentData();
      toast.success("Split created and set as funds recipient");
    } catch (error: unknown) {
      if (isPermissionError(error)) {
        setShowPermissionModal(true);
      } else {
        toast.error((error as Error)?.message || "Failed to create split");
      }
    } finally {
      setIsCreating(false);
    }
  };

  return {
    handleCreate,
    isCreating,
    isSplit,
    showPermissionModal,
    closePermissionModal: () => setShowPermissionModal(false),
  };
};

export default useManageSplits;
