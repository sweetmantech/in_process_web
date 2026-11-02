"use client";

import React, { ReactNode } from "react";
import PrivyProvider from "./PrivyProvider";
import { WagmiProvider } from "./WagmiProvider";
import UserProvider from "./UserProvider";
import WalletsProvider from "./WalletsProvider";
import AuthorizationProvider from "./AuthorizationProvider";
import MiniAppProvider from "./MiniAppProvider";
import LayoutProvider from "./LayoutProvider";
import SmartWalletAccountProvider from "./SmartWalletAccountProvider";
import NotificationsProvider from "./NotificationsProvider";

interface ProvidersProps {
  children: ReactNode;
}

export function Providers({ children }: ProvidersProps): React.ReactElement {
  return (
    <WagmiProvider>
      <PrivyProvider>
        <MiniAppProvider>
          <UserProvider>
            <AuthorizationProvider>
              <WalletsProvider>
                <SmartWalletAccountProvider>
                  <NotificationsProvider>
                    <LayoutProvider>{children}</LayoutProvider>
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
