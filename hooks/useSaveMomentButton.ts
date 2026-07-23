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
      return true;
    } catch (error: any) {
      if (isPermissionError(error)) {
        openPermissionModal();
      } else {
        toast.error(error?.message || "Failed to save media");
      }
      return false;
    }
  }, [updateTokenURI, fetchMomentData, exitEditMode, openPermissionModal]);

  const handleConfirm = async () => {
    closeCollectionWarningModal();
    return save();
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
      return false;
    }

    if (selectedCollection && selectedCollection !== moment.collectionAddress) {
      openCollectionWarningModal();
      return false;
    }

    return save();
  }, [form, selectedCollection, moment.collectionAddress, openCollectionWarningModal, save]);
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
