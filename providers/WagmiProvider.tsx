import { QueryClientProvider } from "@tanstack/react-query";
import { ReactNode } from "react";
import { createConfig, http, WagmiProvider as WProvider } from "wagmi";
import { CHAIN } from "@/lib/consts";
import { farcasterMiniApp } from "@farcaster/miniapp-wagmi-connector";
import { getQueryClient } from "@/lib/react-query/getQueryClient";

export const config = createConfig({
  chains: [CHAIN],
  connectors: [farcasterMiniApp()],
  transports: {
    8453: http(),
    84532: http(),
  },
});

const WagmiProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();

  return (
    <WProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WProvider>
  );
};

export { WagmiProvider };
