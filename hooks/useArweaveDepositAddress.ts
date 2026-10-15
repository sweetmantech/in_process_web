import { useQuery } from "@tanstack/react-query";
import getArweaveDepositAddress from "@/lib/arweave/getArweaveDepositAddress";

const useArweaveDepositAddress = () =>
  useQuery({
    queryKey: ["arweave-deposit-address"],
    queryFn: getArweaveDepositAddress,
    staleTime: Infinity,
  });

export default useArweaveDepositAddress;
