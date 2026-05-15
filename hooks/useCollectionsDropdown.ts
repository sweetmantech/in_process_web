import { useState } from "react";
import { useUserProvider } from "@/providers/UserProvider";
import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useMetadata } from "@/hooks/useMetadata";
import { CollectionItem } from "@/types/collections";

export const useCollectionsDropdown = (onSelect?: (collection: CollectionItem) => void) => {
  const { isPrepared } = useUserProvider();
  const {
    collections,
    isLoading: isCollectionsLoading,
    setSelectedCollection,
    selectedCollection,
  } = useCollectionsProvider();
  const [open, setOpen] = useState(false);

  const selectedItem = collections.find((c) => c.address === selectedCollection);
  const { data: metadata, isLoading } = useMetadata(selectedItem?.uri ?? "");

  const displayName = selectedItem?.name ?? "Please select a collection";
  const imageUrl = metadata?.image || "/images/placeholder.png";

  const handleOpenChange = (newOpen: boolean) => {
    if (newOpen && !isPrepared()) return;
    setOpen(newOpen);
  };

  const handleSelect = (collection: CollectionItem) => {
    setOpen(false);
    setSelectedCollection(collection.address);
    onSelect?.(collection);
  };

  return {
    open,
    handleOpenChange,
    currentCollection: selectedCollection,
    displayName,
    imageUrl,
    isLoading,
    collections,
    isCollectionsLoading,
    handleSelect,
  };
};
