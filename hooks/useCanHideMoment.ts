import { useWalletsProvider } from "@/providers/WalletsProvider";
import { TimelineMoment } from "@/types/moment";

const useCanHideMoment = (moment: TimelineMoment) => {
  const { primaryWallet, wallets } = useWalletsProvider();

  if (!primaryWallet) return false;

  const isAdmin = moment.admins.some(
    (admin) => admin.toLowerCase() === primaryWallet.toLowerCase()
  );
  if (isAdmin) return true;

  return wallets.some(
    (wallet) => wallet.address.toLowerCase() === moment.creator.address.toLowerCase()
  );
};

export default useCanHideMoment;
