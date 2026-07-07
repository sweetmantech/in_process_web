import { useState } from "react";

const useMomentMedia = () => {
  const [editActive, setEditActive] = useState(false);
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const [showCollectionWarningModal, setShowCollectionWarningModal] = useState(false);

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
  };
};

export default useMomentMedia;
