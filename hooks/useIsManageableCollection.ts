import { CHAIN_ID } from "@/lib/consts";
import { useCollectionProvider } from "@/providers/CollectionProvider";
import { Protocol } from "@/types/moment";

const useIsManageableCollection = () => {
  const { data } = useCollectionProvider();
  return data?.protocol === Protocol.InProcess && data?.chain_id === CHAIN_ID;
};

export default useIsManageableCollection;
