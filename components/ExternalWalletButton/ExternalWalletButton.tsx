import { useWalletsProvider } from "@/providers/WalletsProvider";
import { Fragment } from "react";
import { Wallet } from "lucide-react";
import { Address } from "viem";
import DisconnectButton from "./DisconnectButton";
import ConnectButton from "./ConnectButton";
import ConnectedWalletHint from "./ConnectedWalletHint";
import ConnectionRow from "@/components/ManagePage/ConnectionRow";

interface ExternalWalletButtonProps {
  variant?: "pill" | "row";
}

const ExternalWalletButton = ({ variant = "pill" }: ExternalWalletButtonProps) => {
  const { primaryWallet, hasEOA } = useWalletsProvider();
  const shouldConnect = !hasEOA && Boolean(primaryWallet);

  if (!primaryWallet) return <Fragment />;

  if (variant === "row") {
    return (
      <ConnectionRow
        icon={Wallet}
        label="Wallet"
        connected={hasEOA}
        meta={
          hasEOA ? (
            <ConnectedWalletHint address={primaryWallet as Address} compact />
          ) : (
            "Not connected"
          )
        }
      >
        {shouldConnect ? <ConnectButton variant="row" /> : <DisconnectButton variant="row" />}
      </ConnectionRow>
    );
  }

  if (!shouldConnect) {
    return (
      <div className="flex w-full flex-col md:w-fit">
        <DisconnectButton label="disconnect wallet" />
        <ConnectedWalletHint address={primaryWallet as Address} />
      </div>
    );
  }

  return <ConnectButton />;
};

export default ExternalWalletButton;
