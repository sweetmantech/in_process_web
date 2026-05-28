"use client";

import { Fragment } from "react";
import ApiKeyManager from "./ApiKeyManager";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import SignToInProcess from "../ManagePage/SignToInProcess";
import { usePrivy } from "@privy-io/react-auth";

const ApiKeyPage = () => {
  const { primaryWallet } = useWalletsProvider();
  const { ready } = usePrivy();

  if (!ready) return <Fragment />;
  if (!primaryWallet) return <SignToInProcess />;

  return (
    <main className="min-h-screen p-4 md:px-8 md:py-0">
      <ApiKeyManager />
    </main>
  );
};

export default ApiKeyPage;
