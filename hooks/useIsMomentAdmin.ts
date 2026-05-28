import { useWalletsProvider } from "@/providers/WalletsProvider";
import { TimelineMoment } from "@/types/moment";

const useIsMomentAdmin = (moment: TimelineMoment) => {
  const { primaryWallet } = useWalletsProvider();
  if (!primaryWallet) return false;
  return moment.admins.some((admin) => admin.address.toLowerCase() === primaryWallet.toLowerCase());
};

export default useIsMomentAdmin;
