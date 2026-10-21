import { useEffect, useMemo, useRef, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { useArtistCollections } from "@/hooks/useArtistCollections";
import { useDefaultCollection } from "@/hooks/useDefaultCollection";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";

export function useCollections() {
  const { primaryWallet } = useWalletsProvider();
  const queryClient = useQueryClient();
  const params = useParams();
  const searchParams = useSearchParams();

  const { address: parsedParamAddress } = parseCollectionAddress(params.collection as string);
  const initialAddress = searchParams.get("collection") || parsedParamAddress || undefined;

  const [selectedCollection, setSelectedCollection] = useState<string | undefined>(initialAddress);
  const selectedCollectionRef = useRef(selectedCollection);
  selectedCollectionRef.current = selectedCollection;

  const query = useArtistCollections(primaryWallet);
  const defaultQuery = useDefaultCollection(primaryWallet);
  const defaultCollection = defaultQuery.data ?? null;

  useEffect(() => {
    if (!initialAddress) setSelectedCollection(undefined);
  }, [primaryWallet]);

  useEffect(() => {
    if (!defaultCollection?.id || !primaryWallet) return;
    void queryClient.invalidateQueries({ queryKey: ["collections", primaryWallet] });
  }, [defaultCollection?.id, primaryWallet, queryClient]);

  const collections = useMemo(() => {
    const loaded = query.data?.collections ?? [];
    if (!defaultCollection) return loaded;
    const defaultAddress = defaultCollection.address.toLowerCase();
    const rest = loaded.filter((collection) => collection.address.toLowerCase() !== defaultAddress);
    return [defaultCollection, ...rest];
  }, [query.data?.collections, defaultCollection]);

  useEffect(() => {
    if (selectedCollectionRef.current) return;
    if (defaultQuery.isPending) return;
    if (!collections.length) return;
    setSelectedCollection(collections[0].address.toLowerCase());
  }, [collections, defaultQuery.isPending]);

  return {
    collections,
    isLoading: query.isLoading || query.isPending,
    error: query.error instanceof Error ? query.error : null,
    selectedCollection,
    setSelectedCollection,
  };
}
