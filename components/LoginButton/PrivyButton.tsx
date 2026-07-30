"use client";

import useConnectedWallet from "@/hooks/useConnectedWallet";
import truncateAddress from "@/lib/utils/truncateAddress";
import { usePrivy } from "@privy-io/react-auth";
import { ChevronDown } from "lucide-react";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import truncated from "@/lib/utils/truncated";
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
        "flex items-center gap-2 rounded-md bg-grey-moss-400 px-4 py-2 font-archivo-medium text-sm text-white",
        "md:h-[38px] md:gap-2 md:rounded-[10px] md:border md:border-solid md:border-[#E4E0D7] md:bg-[#F1EEE8] md:py-[9px] md:pl-[13px] md:pr-4 md:text-[13.5px] md:text-grey-moss-900 md:hover:border-[#C4BDAE] md:hover:bg-[#EAE6DD]",
        className
      )}
    >
      <div
        className={cn(
          "h-2 w-2 shrink-0 rounded-full",
          privyWallet ? "bg-[#7FD58A]" : "border border-grey-moss-100 md:border-[#A8A296]"
        )}
      />
      {privyWallet ? (
        <>
          <span className="min-w-20 text-left md:min-w-0">
            {truncated(username || "", 9) || truncateAddress(privyWallet.address as string)}
          </span>
          <ChevronDown
            className={cn(
              "ml-4 hidden size-4 transition-transform duration-200 md:ml-0 md:block md:text-[#A8A296]",
              isOpenNavbar && "rotate-180"
            )}
          />
        </>
      ) : (
        "sign in"
      )}
    </button>
  );
}
