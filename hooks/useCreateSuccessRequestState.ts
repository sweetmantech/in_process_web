import { useCollectionsProvider } from "@/providers/CollectionsProvider";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import useTokenIdParam from "@/hooks/useTokenIdParam";
import getCreateSuccessRequestState from "@/lib/createSuccess/getCreateSuccessRequestState";

const useCreateSuccessRequestState = () => {
  const { selectedCollection, collections } = useCollectionsProvider();
  const { createdTokenId } = useMomentCreateProvider();
  const tokenIdFromUrl = useTokenIdParam();

  return getCreateSuccessRequestState({
    createdTokenId,
    tokenIdFromUrl,
    selectedCollection,
    collections,
  });
};

export default useCreateSuccessRequestState;
