import { useState } from "react";

const useMomentEdit = () => {
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
    showCollectionWarningModal,
    openCollectionWarningModal: () => setShowCollectionWarningModal(true),
    closeCollectionWarningModal: () => setShowCollectionWarningModal(false),
  };
};

export default useMomentEdit;
