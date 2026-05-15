"use client";

import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { PrivyButton } from "./PrivyButton";
import { WarpcastButton } from "./WarpcastButton";

interface LoginButtonProps {
  className?: string;
}
export function LoginButton({ className = "" }: LoginButtonProps) {
  const { context } = useMiniAppProvider();

  if (context) return <WarpcastButton className={className} />;

  return <PrivyButton className={className} />;
}
