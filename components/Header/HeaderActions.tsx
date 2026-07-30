"use client";

import LoginButton from "../LoginButton";
import HeaderCreateButton from "./HeaderCreateButton";
import { DropdownMenu } from "./DropdownMenu";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import NotificationButton from "@/components/NotificationButton";
import { useWalletsProvider } from "@/providers/WalletsProvider";

const HeaderActions = () => {
  const { primaryWallet } = useWalletsProvider();
  const { isOpenNavbar, toggleNavbar, isExpandedSearchInput } = useLayoutProvider();

  return (
    <div className="flex items-center gap-3">
      {primaryWallet && <NotificationButton />}
      {!isExpandedSearchInput && (
        <div className="flex items-center gap-2.5 md:relative">
          <HeaderCreateButton />
          <LoginButton />
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
      )}
    </div>
  );
};

export default HeaderActions;
