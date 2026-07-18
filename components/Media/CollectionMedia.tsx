"use client";

import { useCollectionProvider } from "@/providers/CollectionProvider";
import useMediaInitialization from "@/hooks/useMediaInitialization";
import CollectionMediaCard from "./CollectionMediaCard";
import CollectionMediaSkeleton from "./CollectionMediaSkeleton";

const CollectionMedia = () => {
  const { data: collection, isLoading } = useCollectionProvider();
  useMediaInitialization(collection?.metadata ?? undefined);

  if (isLoading) return <CollectionMediaSkeleton />;

  return <CollectionMediaCard />;
};

export default CollectionMedia;
