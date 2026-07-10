"use client";

import LoginButton from "../LoginButton";
import { DropdownMenu } from "../LoginButton/DropdownMenu";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import NotificationButton from "@/components/NotificationButton";
import { useWalletsProvider } from "@/providers/WalletsProvider";

const HeaderActions = () => {
  const { primaryWallet } = useWalletsProvider();
  const { isOpenNavbar, toggleNavbar, isExpandedSearchInput } = useLayoutProvider();

  return (
    <>
      {primaryWallet && <NotificationButton />}
      <div className="flex items-center gap-1 md:relative md:gap-2">
        {!isExpandedSearchInput && <LoginButton />}
        {primaryWallet && (
          <button
            onClick={toggleNavbar}
            type="button"
            className="flex flex-col rounded-md bg-grey-moss-400 px-2 py-1.5 md:hidden"
            aria-label="Toggle navigation"
            aria-expanded={isOpenNavbar}
          >
            <div className="size-2 rounded-full bg-grey-moss-100" />
            <div className="size-2 rounded-full bg-grey-moss-100" />
            <div className="size-2 rounded-full bg-grey-moss-100" />
          </button>
        )}
        {isOpenNavbar && primaryWallet && <DropdownMenu />}
      </div>
    </>
  );
};

export default HeaderActions;
