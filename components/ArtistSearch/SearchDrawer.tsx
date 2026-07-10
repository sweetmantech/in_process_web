"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Search } from "lucide-react";
import useSearch from "@/hooks/useSearch";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import SearchDrawerPanel from "./SearchDrawerPanel";

const SearchDrawer = () => {
  const { toggleDrawer, closeDrawer, isDrawerOpen } = useMobileDrawersProvider();
  const {
    searchKey,
    suffixHint,
    artists,
    isLoadingSearch,
    onChangeSearchKey,
    onKeyDown,
    navigateTo,
  } = useSearch();
  const [mounted, setMounted] = useState(false);
  const isOpen = isDrawerOpen("search");

  useEffect(() => setMounted(true), []);

  const handleNavigateTo = (address: string) => {
    navigateTo(address);
    closeDrawer();
  };

  return (
    <>
      <button type="button" onClick={() => toggleDrawer("search")}>
        <Search
          className="h-[23px] w-[23px]"
          strokeWidth={1.75}
          color={isOpen ? "#1B1504" : "#B6B2A8"}
        />
      </button>

      {mounted &&
        createPortal(
          <SearchDrawerPanel
            isOpen={isOpen}
            onClose={closeDrawer}
            searchKey={searchKey}
            suffixHint={suffixHint}
            artists={artists}
            isLoading={isLoadingSearch}
            onChangeSearchKey={onChangeSearchKey}
            onKeyDown={onKeyDown}
            navigateTo={handleNavigateTo}
          />,
          document.body
        )}
    </>
  );
};

export default SearchDrawer;
