"use client";

import sdk, { type Context } from "@farcaster/miniapp-sdk";
import { useState, useEffect, ReactNode, createContext, useContext, useMemo } from "react";

interface MiniAppContextType {
  context: Context.MiniAppContext | undefined;
  miniAppReady: boolean; // true once sdk.context has resolved (distinguishes "not Farcaster" from "not yet loaded")
}

const MiniAppContext = createContext<MiniAppContextType>({} as MiniAppContextType);

export default function MiniAppProvider({ children }: { children: ReactNode }) {
  const [isSDKLoaded, setIsSDKLoaded] = useState<boolean>(false);
  const [context, setContext] = useState<Context.MiniAppContext>();
  const [miniAppReady, setMiniAppReady] = useState<boolean>(false);

  useEffect(() => {
    const load = async () => {
      try {
        const context = await sdk.context;
        setContext(context);
        sdk.actions.ready();
      } finally {
        setMiniAppReady(true);
      }
    };

    if (sdk && !isSDKLoaded) {
      setIsSDKLoaded(true);
      load();
    }
  }, [isSDKLoaded]);

  const value = useMemo(
    () => ({
      context,
      miniAppReady,
    }),
    [context, miniAppReady]
  );

  return <MiniAppContext.Provider value={value}>{children}</MiniAppContext.Provider>;
}

export const useMiniAppProvider = () => {
  const context = useContext(MiniAppContext);
  if (!context) {
    throw new Error("useMiniAppProvider must be used within a MiniAppProvider");
  }
  return context;
};
