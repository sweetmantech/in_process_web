import { useState } from "react";
import { toast } from "sonner";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useMomentUriUpdateProvider } from "@/providers/MomentUriUpdateProvider";
import { useMediaEditProvider } from "@/providers/MediaEditProvider";
import { isPermissionError } from "@/lib/errors/isPermissionError";

export const useCollectionChangeWarning = () => {
  const { moment, fetchMomentData } = useMomentProvider();
  const { exitEditMode } = useMediaEditProvider();
  const { updateTokenURI, isLoading: isSaving } = useMomentUriUpdateProvider();
  const { selectedCollection, setSelectedCollection } = useCollectionsProvider();
  const [open, setOpen] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);

  const isCollectionChanged = Boolean(
    selectedCollection && selectedCollection !== moment.collectionAddress
  );

  const save = async () => {
    try {
      await updateTokenURI();
      await fetchMomentData();
      exitEditMode();
      toast.success("Successfully saved media.");
    } catch (error: any) {
      if (isPermissionError(error)) {
        setShowPermissionModal(true);
      } else {
        toast.error(error?.message || "Failed to save media");
      }
    }
  };

  const openWarning = () => setOpen(true);

  const handleConfirm = async () => {
    setOpen(false);
    await save();
  };

  const handleCancel = () => {
    setSelectedCollection(moment.collectionAddress);
    setOpen(false);
  };

  return {
    open,
    isSaving,
    isCollectionChanged,
    save,
    openWarning,
    handleConfirm,
    handleCancel,
    showPermissionModal,
    closePermissionModal: () => setShowPermissionModal(false),
  };
};
