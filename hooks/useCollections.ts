import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { fetchCollections } from "@/lib/collections/fetchCollections";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";

export function useCollections() {
  const { primaryWallet } = useWalletsProvider();
  const params = useParams();
  const searchParams = useSearchParams();

  const { address: parsedParamAddress } = parseCollectionAddress(
    params.collectionAddress as string
  );
  const initialAddress = searchParams.get("collectionAddress") || parsedParamAddress || undefined;

  const [selectedCollection, setSelectedCollection] = useState<string | undefined>(initialAddress);

  const query = useQuery({
    queryKey: ["collections", primaryWallet],
    queryFn: () => fetchCollections(1, 100, primaryWallet),
    enabled: Boolean(primaryWallet),
    staleTime: 60_000,
  });

  const collections = query.data?.collections ?? [];

  useEffect(() => {
    if (selectedCollection) return;
    const loadedCollections = query.data?.collections;
    if (!loadedCollections?.length) return;
    setSelectedCollection(loadedCollections[0].address);
  }, [selectedCollection, query.data?.collections]);

  return {
    collections,
    isLoading: query.isLoading || query.isPending,
    error: query.error instanceof Error ? query.error : null,
    selectedCollection,
    setSelectedCollection,
  };
}
