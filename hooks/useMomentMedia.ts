import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useState } from "react";

const useMomentMedia = () => {
  const { moment } = useMomentProvider();
  const [editActive, setEditActive] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const { selectedCollection, setSelectedCollection } = useCollectionsProvider();
  const [showCollectionWarningModal, setShowCollectionWarningModal] = useState(false);

  const isCollectionChanged = Boolean(
    selectedCollection && selectedCollection !== moment.collectionAddress
  );

  const cancelCollectionChanging = () => {
    setSelectedCollection(moment.collectionAddress);
    setShowCollectionWarningModal(false);
  };

  return {
    editActive,
    enterEditMode: () => setEditActive(true),
    exitEditMode: () => setEditActive(false),
    showPermissionModal,
    openPermissionModal: () => setShowPermissionModal(true),
    closePermissionModal: () => setShowPermissionModal(false),
    cancelCollectionChanging,
    openCollectionWarningModal: () => setShowCollectionWarningModal(true),
    closeCollectionWarningModal: () => setShowCollectionWarningModal(false),
    showCollectionWarningModal,
    isCollectionChanged,
  };
};

export default useMomentMedia;
