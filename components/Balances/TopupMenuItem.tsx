import { DollarSign } from "lucide-react";
import { useSmartAccountProvider } from "@/providers/SmartWalletAccountProvider";
import formatBalanceAmount from "@/lib/balance/formatBalanceAmount";

interface TopupMenuItemProps {
  className: string;
  iconClassName: string;
  onClick: () => void;
}

const TopupMenuItem = ({ className, iconClassName, onClick }: TopupMenuItemProps) => {
  const { balance, isLoading } = useSmartAccountProvider();

  return (
    <button type="button" onClick={onClick} className={`${className} justify-between`}>
      <span className="flex items-center gap-3">
        <DollarSign className={iconClassName} strokeWidth={1.5} />
        Topup
      </span>
      {isLoading ? (
        <span className="h-3 w-14 animate-pulse rounded bg-white/20" />
      ) : (
        <span className="text-white/40">${formatBalanceAmount(balance)}</span>
      )}
    </button>
  );
};

export default TopupMenuItem;
