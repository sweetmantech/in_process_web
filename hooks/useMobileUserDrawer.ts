"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { useUserProvider } from "@/providers/UserProvider";
import truncated from "@/lib/truncated";
import truncateAddress from "@/lib/truncateAddress";

export const useMobileUserDrawer = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { push } = useRouter();
  const { logout, login } = usePrivy();
  const { primaryWallet } = useWalletsProvider();
  const { isMiniApp } = useMiniAppProvider();
  const { username } = useUserProvider();
  const displayName = primaryWallet
    ? truncated(username || "", 14) || truncateAddress(primaryWallet)
    : null;
  const toggle = () => {
    if (!primaryWallet) {
      login();
      return;
    }
    setIsOpen((prev) => !prev);
  };
  const close = () => setIsOpen(false);

  const onTimeline = () => {
    close();
    push(primaryWallet ? `/${primaryWallet}` : "/");
  };

  const onManage = () => {
    close();
    push("/manage");
  };

  const onManifesto = () => {
    close();
    window.open("/manifesto", "_blank");
  };

  const onFaq = () => {
    close();
    window.open("/faq", "_blank");
  };

  const onLogout = () => {
    close();
    logout();
  };

  return {
    isOpen,
    toggle,
    close,
    onTimeline,
    onManage,
    onManifesto,
    onFaq,
    onLogout,
    isMiniApp,
    displayName,
  };
};
