import { useEffect, useRef, useState } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMomentEditProvider } from "@/providers/MomentEditProvider";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import useSaveMomentButton from "@/hooks/useSaveMomentButton";

const useMomentMedia = () => {
  const { moment, metadata, isOwner } = useMomentProvider();
  const { name, description, setName, setDescription, hasMedia, resetFiles } =
    useMetadataFormProvider();
  const { editActive, exitEditMode } = useMomentEditProvider();
  const { selectedCollection, setSelectedCollection } = useCollectionsProvider();
  const { isDisabled, handleSave, handleConfirm, isSaving } = useSaveMomentButton();

  const [savedName, setSavedName] = useState("");
  const [savedDescription, setSavedDescription] = useState("");
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!metadata || initializedRef.current) return;
    setSavedName(metadata.name ?? "");
    setSavedDescription(metadata.description ?? "");
    initializedRef.current = true;
  }, [metadata]);

  const collectionChanged = Boolean(
    selectedCollection && selectedCollection !== moment.collectionAddress
  );
  const dirty =
    name !== savedName || description !== savedDescription || hasMedia || collectionChanged;
  // editActive alone (replace-media flow) should still surface discard
  const showActions = dirty || editActive;

  const onDiscard = () => {
    setName(savedName);
    setDescription(savedDescription);
    resetFiles();
    setSelectedCollection(moment.collectionAddress);
    exitEditMode();
  };

  const onSave = async () => {
    const saved = await handleSave();
    if (saved) {
      setSavedName(name);
      setSavedDescription(description);
    }
  };

  const onConfirmCollectionChange = async () => {
    const saved = await handleConfirm();
    if (saved) {
      setSavedName(name);
      setSavedDescription(description);
    }
  };

  return {
    isOwner,
    isSaving,
    isDisabled,
    dirty,
    showActions,
    onSave,
    onDiscard,
    onConfirmCollectionChange,
  };
};

export default useMomentMedia;
