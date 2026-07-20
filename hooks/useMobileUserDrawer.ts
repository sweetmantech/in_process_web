"use client";

import { useRouter } from "next/navigation";
import { usePrivy } from "@privy-io/react-auth";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { useUserProvider } from "@/providers/UserProvider";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import truncated from "@/lib/truncated";
import truncateAddress from "@/lib/truncateAddress";

export const useMobileUserDrawer = () => {
  const { toggleDrawer, closeDrawer, isDrawerOpen } = useMobileDrawersProvider();
  const { push } = useRouter();
  const { logout, login } = usePrivy();
  const { primaryWallet } = useWalletsProvider();
  const { isMiniApp } = useMiniAppProvider();
  const { username } = useUserProvider();
  const displayName = primaryWallet
    ? truncated(username || "", 14) || truncateAddress(primaryWallet)
    : null;
  const isOpen = isDrawerOpen("user");

  const toggle = () => {
    if (!primaryWallet) {
      login();
      return;
    }
    toggleDrawer("user");
  };

  const close = () => closeDrawer();

  const onTimeline = () => {
    close();
    push(primaryWallet ? `/${primaryWallet}` : "/");
  };

  const onManage = () => {
    close();
    push("/manage");
  };

  const onTopup = () => {
    close();
    push("/topup");
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
    onTopup,
    onLogout,
    isMiniApp,
    displayName,
  };
};
