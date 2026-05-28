import { AirdropItem } from "@/types/airdrop";
import { useAirdropProvider } from "@/providers/AirdropProvider";
import { useMomentProvider } from "@/providers/MomentProvider";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import useMomentLegacyWarning from "@/hooks/useMomentLegacyWarning";

const AirdropButton = () => {
  const { airdropToItems, onAirdrop, loading } = useAirdropProvider();
  const { owner, momentAdmins } = useMomentProvider();
  const { primaryWallet } = useWalletsProvider();
  const hasWarning = useMomentLegacyWarning();
  const canAirdrop =
    Boolean(owner?.toLowerCase() === primaryWallet?.toLowerCase()) ||
    Boolean(primaryWallet && momentAdmins?.includes(primaryWallet.toLowerCase()));

  if (hasWarning) return null;

  return (
    <button
      type="button"
      disabled={
        !Boolean(airdropToItems.length) ||
        Boolean(airdropToItems.filter((item: AirdropItem) => item.status === "invalid").length) ||
        loading ||
        !canAirdrop
      }
      className="mt-2 w-fit rounded-md bg-black px-3 py-2 text-xs font-archivo text-white transition-opacity hover:opacity-80 disabled:cursor-not-allowed disabled:bg-grey-moss-300 disabled:hover:opacity-100"
      onClick={onAirdrop}
    >
      {loading ? "Loading..." : "airdrop"}
    </button>
  );
};

export default AirdropButton;
