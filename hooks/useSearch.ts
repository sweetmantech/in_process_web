import { useLayoutProvider } from "@/providers/LayoutProvider";
import { useRouter } from "next/navigation";
import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from "react";
import useArtistAutocomplete from "@/hooks/useArtistAutocomplete";

const useSearch = () => {
  const { push } = useRouter();
  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);
  const { setIsExpandedSearchInput } = useLayoutProvider();
  const {
    inputValue: searchKey,
    setInputValue,
    artists,
    isLoading: isLoadingSearch,
  } = useArtistAutocomplete();

  const firstArtist = artists[0] ?? null;
  const userSearchData = useMemo(() => ({ artist: firstArtist }), [firstArtist]);

  const suffixHint = useMemo(() => {
    if (!firstArtist?.username) return "";
    return firstArtist.username.slice(searchKey.length);
  }, [firstArtist, searchKey]);

  const redirectToArtist = () => {
    if (!firstArtist) return;
    setIsOpenModal(false);
    setIsExpandedSearchInput(false);
    push(`/${firstArtist.address}`);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement | HTMLButtonElement>) => {
    if (e.key === "Tab") {
      setInputValue(firstArtist?.username || "");
      return;
    }
    if (e.key === "Enter") redirectToArtist();
  };

  const onChangeSearchKey = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  useEffect(() => {
    function preventTab(e: any) {
      e = e || window.event;
      if (e.keyCode === 9) {
        e.preventDefault();
      }
    }

    window.addEventListener("keydown", preventTab);

    return () => window.removeEventListener("keydown", preventTab);
  }, [isOpenModal]);

  return {
    userSearchData,
    isLoadingSearch,
    onChangeSearchKey,
    onKeyDown,
    suffixHint,
    searchKey,
    redirectToArtist,
    isOpenModal,
    setIsOpenModal,
  };
};

export default useSearch;
