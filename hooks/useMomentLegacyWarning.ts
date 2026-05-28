import { useMomentProvider } from "@/providers/MomentProvider";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";

const useMomentLegacyWarning = () => {
  const { smartWallet } = useSmartAccountProvider();
  const { momentAdmins, isOwner } = useMomentProvider();
  const hasMomentAdmins = Array.isArray(momentAdmins);

  const hasWarning =
    smartWallet && hasMomentAdmins && !momentAdmins.includes(smartWallet.toLowerCase()) && isOwner;

  return hasWarning;
};

export default useMomentLegacyWarning;
