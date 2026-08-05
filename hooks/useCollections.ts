import { useEffect, useMemo, useRef, useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { fetchCollections } from "@/lib/collections/fetchCollections";
import { createDefaultCollection } from "@/lib/collections/createDefaultCollection";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useAuthorizationProvider } from "@/providers/AuthorizationProvider";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";
import type { CollectionItem } from "@/types/collections";

export function useCollections() {
  const { primaryWallet } = useWalletsProvider();
  const { getAuthHeaders } = useAuthorizationProvider();
  const queryClient = useQueryClient();
  const params = useParams();
  const searchParams = useSearchParams();

  const { address: parsedParamAddress } = parseCollectionAddress(params.collection as string);
  const initialAddress = searchParams.get("collection") || parsedParamAddress || undefined;

  const [selectedCollection, setSelectedCollection] = useState<string | undefined>(initialAddress);
  const selectedCollectionRef = useRef(selectedCollection);
  selectedCollectionRef.current = selectedCollection;

  const [defaultCollection, setDefaultCollection] = useState<CollectionItem | null>(null);
  const ensuredProcessForWalletRef = useRef<string | null>(null);

  const query = useQuery({
    queryKey: ["collections", primaryWallet],
    queryFn: () => fetchCollections(1, 100, primaryWallet),
    enabled: Boolean(primaryWallet),
    staleTime: 60_000,
  });

  useEffect(() => {
    if (!initialAddress) setSelectedCollection(undefined);
    setDefaultCollection(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryWallet]);

  useEffect(() => {
    if (!primaryWallet) {
      ensuredProcessForWalletRef.current = null;
      return;
    }
    if (ensuredProcessForWalletRef.current === primaryWallet) return;

    let cancelled = false;
    ensuredProcessForWalletRef.current = primaryWallet;

    void (async () => {
      try {
        const collection = await createDefaultCollection(await getAuthHeaders());
        if (cancelled) return;
        setDefaultCollection(collection);
        await queryClient.invalidateQueries({
          queryKey: ["collections", primaryWallet],
        });
      } catch (error) {
        if (cancelled) return;
        ensuredProcessForWalletRef.current = null;
        console.error("Failed to ensure Process collection", error);
      }
    })();

    return () => {
      cancelled = true;
      if (ensuredProcessForWalletRef.current === primaryWallet) {
        ensuredProcessForWalletRef.current = null;
      }
    };
    // Intentionally omit getAuthHeaders: new identity each render would cancel in-flight ensures.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [primaryWallet, queryClient]);

  const collections = useMemo(() => {
    const loaded = query.data?.collections ?? [];
    if (!defaultCollection) return loaded;
    const defaultAddress = defaultCollection.address.toLowerCase();
    const rest = loaded.filter((collection) => collection.address.toLowerCase() !== defaultAddress);
    return [defaultCollection, ...rest];
  }, [query.data?.collections, defaultCollection]);

  useEffect(() => {
    if (selectedCollectionRef.current) return;
    if (!collections.length) return;
    setSelectedCollection(collections[0].address.toLowerCase());
  }, [collections]);

  return {
    collections,
    isLoading: query.isLoading || query.isPending,
    error: query.error instanceof Error ? query.error : null,
    selectedCollection,
    setSelectedCollection,
  };
}
