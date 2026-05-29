import { useWalletsProvider } from "@/providers/WalletsProvider";
import { Fragment } from "react";
import { Address } from "viem";
import DisconnectButton from "./DisconnectButton";
import ConnectButton from "./ConnectButton";
import ConnectedWalletHint from "./ConnectedWalletHint";

const ExternalWalletButton = () => {
  const { primaryWallet, hasEOA } = useWalletsProvider();
  const shouldConnect = !hasEOA && Boolean(primaryWallet);

  if (!primaryWallet) return <Fragment />;

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
