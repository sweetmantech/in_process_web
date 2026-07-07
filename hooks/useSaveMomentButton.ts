import { useCallback } from "react";
import { toast } from "sonner";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useMomentUriUpdateProvider } from "@/providers/MomentUriUpdateProvider";
import { useMomentEditProvider } from "@/providers/MomentEditProvider";
import { isPermissionError } from "@/lib/errors/isPermissionError";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useFormState } from "react-hook-form";
import useIsManageableCollection from "./useIsManageableCollection";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";

const useSaveMomentButton = () => {
  const { fetchMomentData, moment } = useMomentProvider();
  const { updateTokenURI, isLoading: isSaving } = useMomentUriUpdateProvider();
  const { isOwner } = useMomentProvider();
  const isManageable = useIsManageableCollection();
  const { selectedCollection } = useCollectionsProvider();
  const {
    openCollectionWarningModal,
    closeCollectionWarningModal,
    exitEditMode,
    openPermissionModal,
  } = useMomentEditProvider();
  const { form } = useMetadataFormProvider();
  const { errors } = useFormState({ control: form.control });

  const save = useCallback(async () => {
    try {
      await updateTokenURI();
      await fetchMomentData();
      exitEditMode();
      toast.success("Successfully saved media.");
    } catch (error: any) {
      if (isPermissionError(error)) {
        openPermissionModal();
      } else {
        toast.error(error?.message || "Failed to save media");
      }
    }
  }, [updateTokenURI, fetchMomentData, exitEditMode]);

  const handleConfirm = async () => {
    closeCollectionWarningModal();
    await save();
  };

  const handleSave = useCallback(async () => {
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

    if (selectedCollection && selectedCollection !== moment.collectionAddress) {
      openCollectionWarningModal();
      return;
    }

    await save();
  }, [form]);

  const nameValue = form.watch("name");
  const nameError = errors.name;
  const hasValidName = nameValue && typeof nameValue === "string" && nameValue.trim().length > 0;
  const isFormValid = hasValidName && !nameError;
  const isDisabled = !isOwner || !isFormValid || !isManageable || isSaving;

  return {
    save,
    isDisabled,
    handleSave,
    handleConfirm,
    isSaving,
  };
};

export default useSaveMomentButton;
