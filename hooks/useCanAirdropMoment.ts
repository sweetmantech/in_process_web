import { getAddress } from "viem";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";

const useCanAirdropMoment = () => {
  const { owner, momentAdmins } = useMomentProvider();
  const { primaryWallet } = useWalletsProvider();

  return (
    Boolean(primaryWallet && owner && getAddress(owner) === getAddress(primaryWallet)) ||
    Boolean(
      primaryWallet &&
      momentAdmins?.some((admin) => getAddress(admin) === getAddress(primaryWallet))
    )
  );
};

export default useCanAirdropMoment;
