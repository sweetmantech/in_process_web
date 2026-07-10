"use client";

import useConnectedWallet from "@/hooks/useConnectedWallet";
import truncateAddress from "@/lib/truncateAddress";
import { usePrivy } from "@privy-io/react-auth";
import { ChevronDown } from "lucide-react";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import truncated from "@/lib/truncated";
import { useUserProvider } from "@/providers/UserProvider";
import { cn } from "@/lib/utils";

interface PrivyButtonProps {
  className?: string;
}

export function PrivyButton({ className = "" }: PrivyButtonProps) {
  const { login, ready } = usePrivy();
  const { privyWallet } = useConnectedWallet();
  const { toggleNavbar, isOpenNavbar } = useLayoutProvider();
  const { username } = useUserProvider();

  if (!ready) return null;

  const handleClick = async () => {
    if (!privyWallet) {
      login();
      return;
    }
    toggleNavbar();
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(
        "flex items-center rounded-lg md:rounded-[10px] font-archivo-medium text-sm text-white md:bg-black md:text-[13px] md:hover:bg-[#34332F]",
        className
      )}
    >
      <div className="flex items-center gap-2 rounded-md bg-grey-moss-400 px-2 py-2 md:gap-1.5 md:bg-transparent px-4">
        <div
          className={`h-[7px] w-[7px] rounded-full ${privyWallet ? "bg-[#7FD58A]" : "border border-grey-moss-100"}`}
        />
        {privyWallet ? (
          <>
            <p className="min-w-20 text-left md:min-w-0">
              {truncated(username || "", 9) || truncateAddress(privyWallet.address as string)}
            </p>
            <ChevronDown
              className={`ml-4 hidden size-3.5 text-white/65 transition-transform duration-200 md:block ${isOpenNavbar ? "rotate-180" : ""}`}
            />
          </>
        ) : (
          "sign in"
        )}
      </div>
    </button>
  );
}
