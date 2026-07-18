import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import useUpdateCollectionURI from "@/hooks/useUpdateCollectionURI";
import useIsCollectionOwner from "@/hooks/useIsCollectionOwner";
import useIsManageableCollection from "@/hooks/useIsManageableCollection";
import { isPermissionError } from "@/lib/errors/isPermissionError";

const useCollectionMedia = () => {
  const { data: collection, tokens } = useCollectionProvider();
  const metadata = collection?.metadata ?? null;
  const isOwner = useIsCollectionOwner();
  const isManageable = useIsManageableCollection();
  const { updateCollectionURI, isLoading: isSaving } = useUpdateCollectionURI();
  const { name, description, setName, setDescription, hasMedia, resetFiles } =
    useMetadataFormProvider();

  const [savedName, setSavedName] = useState("");
  const [savedDescription, setSavedDescription] = useState("");
  const [showPermissionModal, setShowPermissionModal] = useState(false);
  const initializedRef = useRef(false);

  useEffect(() => {
    if (!metadata || initializedRef.current) return;
    setSavedName(metadata.name ?? "");
    setSavedDescription(metadata.description ?? "");
    initializedRef.current = true;
  }, [metadata]);

  const hasValidName = Boolean(name && name.trim().length > 0);
  const dirty = name !== savedName || description !== savedDescription || hasMedia;
  const isDisabled = !isOwner || !isManageable || !hasValidName;

  const onDiscard = () => {
    setName(savedName);
    setDescription(savedDescription);
    resetFiles();
  };

  const onSave = async () => {
    if (!hasValidName) {
      toast.error("Collection name is required");
      return;
    }

    try {
      await updateCollectionURI();
      setSavedName(name);
      setSavedDescription(description);
      toast.success("Successfully saved collection.");
    } catch (error: any) {
      if (isPermissionError(error)) {
        setShowPermissionModal(true);
      }
    }
  };

  const createdAt = collection?.created_at
    ? new Date(collection.created_at).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "—";

  return {
    isOwner,
    isSaving,
    isDisabled,
    dirty,
    onSave,
    onDiscard,
    showPermissionModal,
    closePermissionModal: () => setShowPermissionModal(false),
    stats: [
      { value: String(tokens.data?.length ?? 0), label: "moments" },
      { value: createdAt, label: "created" },
    ],
  };
};

export default useCollectionMedia;
