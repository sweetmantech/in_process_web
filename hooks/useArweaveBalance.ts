import { useQuery } from "@tanstack/react-query";
import getArweaveBalance from "@/lib/arweave/getArweaveBalance";

const useArweaveBalance = () =>
  useQuery({
    queryKey: ["arweave-balance"],
    queryFn: getArweaveBalance,
    refetchInterval: 30_000,
  });

export default useArweaveBalance;
