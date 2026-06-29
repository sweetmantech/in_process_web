"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { Search } from "lucide-react";
import useSearch from "@/hooks/useSearch";
import MobileSearchDrawerPanel from "./MobileSearchDrawerPanel";

const MobileSearchDrawer = () => {
  const {
    isOpenModal: isOpen,
    setIsOpenModal,
    searchKey,
    suffixHint,
    artists,
    isLoadingSearch,
    onChangeSearchKey,
    onKeyDown,
    navigateTo,
  } = useSearch();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button type="button" onClick={() => setIsOpenModal(true)}>
        <Search
          className="h-[23px] w-[23px]"
          strokeWidth={1.75}
          color={isOpen ? "#1B1504" : "#B6B2A8"}
        />
      </button>

      {mounted &&
        createPortal(
          <MobileSearchDrawerPanel
            isOpen={isOpen}
            onClose={() => setIsOpenModal(false)}
            searchKey={searchKey}
            suffixHint={suffixHint}
            artists={artists}
            isLoading={isLoadingSearch}
            onChangeSearchKey={onChangeSearchKey}
            onKeyDown={onKeyDown}
            navigateTo={navigateTo}
          />,
          document.body
        )}
    </>
  );
};

export default MobileSearchDrawer;
