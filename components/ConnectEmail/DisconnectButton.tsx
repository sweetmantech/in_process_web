"use client";

import DisconnectButton from "@/components/ExternalWalletButton/DisconnectButton";

interface EmailDisconnectButtonProps {
  variant?: "pill" | "row";
}

const EmailDisconnectButton = ({ variant = "pill" }: EmailDisconnectButtonProps) => (
  <DisconnectButton label="disconnect email" variant={variant} />
);

export default EmailDisconnectButton;
