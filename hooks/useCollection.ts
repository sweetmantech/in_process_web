import { callGetCollectionApi } from "@/lib/collection/callGetCollectionApi";
import { useQuery } from "@tanstack/react-query";

const useCollection = ({
  collectionAddress,
  chainId,
}: {
  collectionAddress: string;
  chainId?: string;
}) => {
  return useQuery({
    queryKey: ["collection", collectionAddress, chainId],
    queryFn: () =>
      callGetCollectionApi({
        collectionAddress,
        chainId: chainId!,
      }),
    enabled: Boolean(collectionAddress && chainId),
    staleTime: 1000 * 60 * 5,
  });
};

export default useCollection;
