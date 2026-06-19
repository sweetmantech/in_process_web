import { useCallback, useState } from "react";
import { toast } from "sonner";
import { useFormState } from "react-hook-form";
import useUpdateCollectionURI from "@/hooks/useUpdateCollectionURI";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useIsCollectionOwner from "@/hooks/useIsCollectionOwner";
import useIsManageableCollection from "@/hooks/useIsManageableCollection";
import { SaveCollectionButtonProps } from "@/components/CollectionManagePage/SaveCollectionButton";
import { isPermissionError } from "@/lib/errors/isPermissionError";

const useSaveCollectionButton = ({ onSuccess }: SaveCollectionButtonProps) => {
  const isOwner = useIsCollectionOwner();
  const isManageable = useIsManageableCollection();
  const { updateCollectionURI, isLoading: isSaving } = useUpdateCollectionURI();
  const { form } = useMetadataFormProvider();
  const { errors } = useFormState({ control: form.control });
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const nameValue = form.watch("name");
  const nameError = errors.name;
  const hasValidName = nameValue && typeof nameValue === "string" && nameValue.trim().length > 0;
  const isFormValid = hasValidName && !nameError;

  const isDisabled = !isOwner || !isFormValid || !isManageable;

  const onSave = useCallback(async () => {
    const isValid = await form.trigger();
    if (!isValid) {
      const errors = form.formState.errors;
      if (errors.name) {
        toast.error(errors.name.message || "Title is required");
      } else {
        toast.error("Please fix form errors");
      }
      return;
    }

    try {
      await updateCollectionURI();
      onSuccess?.();
      toast.info(
        "Successfully saved collection. Metadata update will show up after a few seconds..."
      );
    } catch (error: any) {
      if (isPermissionError(error)) {
        setShowPermissionModal(true);
      } else {
        toast.error(error?.message || "Failed to save collection");
      }
    }
  }, [form, updateCollectionURI, onSuccess]);

  return {
    isSaving,
    isDisabled,
    onSave,
    showPermissionModal,
    closePermissionModal: () => setShowPermissionModal(false),
  };
};

export default useSaveCollectionButton;
