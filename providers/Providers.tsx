"use client";

import React, { ReactNode, useState, useEffect } from "react";
import PrivyProvider from "./PrivyProvider";
import { WagmiProvider } from "./WagmiProvider";
import UserProvider from "./UserProvider";
import WalletsProvider from "./WalletsProvider";
import AuthorizationProvider from "./AuthorizationProvider";
import MiniAppProvider from "./MiniAppProvider";
import LayoutProvider from "./LayoutProvider";
import SmartWalletAccountProvider from "./SmartWalletAccountProvider";
import WayfinderProvider from "./WayfinderProvider";
import NotificationsProvider from "./NotificationsProvider";
import LoadingPage from "@/components/LoadingPage/LoadingPage";


interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): React.ReactElement {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <LoadingPage />;

  return (
    <WagmiProvider>
      <PrivyProvider>
        <MiniAppProvider>
          <UserProvider>
            <AuthorizationProvider>
              <WalletsProvider>
                <SmartWalletAccountProvider>
                  <NotificationsProvider>
                    <WayfinderProvider>
                      <LayoutProvider>{children}</LayoutProvider>
                    </WayfinderProvider>
                  </NotificationsProvider>
                </SmartWalletAccountProvider>
              </WalletsProvider>
            </AuthorizationProvider>
          </UserProvider>
        </MiniAppProvider>
      </PrivyProvider>
    </WagmiProvider>
  );
}
