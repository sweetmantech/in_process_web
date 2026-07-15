import { useWalletsProvider } from "@/providers/WalletsProvider";
import { Fragment } from "react";
import { Wallet } from "lucide-react";
import { Address } from "viem";
import DisconnectButton from "./DisconnectButton";
import ConnectButton from "./ConnectButton";
import ConnectedWalletHint from "./ConnectedWalletHint";
import ConnectionItem from "@/components/ManagePage/ConnectionItem";

const ExternalWalletButton = () => {
  const { primaryWallet, hasEOA } = useWalletsProvider();
  const shouldConnect = !hasEOA && Boolean(primaryWallet);

  if (!primaryWallet) return <Fragment />;

  return (
    <ConnectionItem
      icon={Wallet}
      label="Wallet"
      connected={hasEOA}
      meta={hasEOA ? <ConnectedWalletHint address={primaryWallet as Address} /> : "Not connected"}
    >
      {shouldConnect ? <ConnectButton /> : <DisconnectButton />}
    </ConnectionItem>
  );
};

export default ExternalWalletButton;
