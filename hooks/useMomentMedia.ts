import { useState } from "react";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useMomentProvider } from "@/providers/MomentProvider";

const useMomentMedia = () => {
  const { moment } = useMomentProvider();
  const { selectedCollection, setSelectedCollection } = useCollectionsProvider();
  const [editActive, setEditActive] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
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
    openCollectionWarningModal: () => setShowCollectionWarningModal(true),
    closeCollectionWarningModal: () => setShowCollectionWarningModal(false),
    showCollectionWarningModal,
    isCollectionChanged,
    cancelCollectionChanging,
  };
};

export default useMomentMedia;
