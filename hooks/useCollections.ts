import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useParams, useSearchParams } from "next/navigation";
import { fetchCollections } from "@/lib/collections/fetchCollections";
import { useUserProvider } from "@/providers/UserProvider";
import { parseCollectionAddress } from "@/lib/timeline/parseCollectionAddress";

export function useCollections() {
  const { artistWallet } = useUserProvider();
  const params = useParams();
  const searchParams = useSearchParams();

  const { address: parsedParamAddress } = parseCollectionAddress(
    params.collectionAddress as string
  );
  const initialAddress = searchParams.get("collectionAddress") || parsedParamAddress || undefined;

  const [selectedCollection, setSelectedCollection] = useState<string | undefined>(initialAddress);

  const query = useQuery({
    queryKey: ["collections", artistWallet],
    queryFn: () => fetchCollections(1, 100, artistWallet),
    enabled: Boolean(artistWallet),
    staleTime: 60_000,
  });

  return {
    collections: query.data?.collections ?? [],
    isLoading: query.isLoading || query.isPending,
    error: query.error instanceof Error ? query.error : null,
    selectedCollection,
    setSelectedCollection,
  };
}
