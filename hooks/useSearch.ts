import { ChangeEvent, KeyboardEvent, useEffect, useMemo, useState } from "react";
import useArtistAutocomplete from "@/hooks/useArtistAutocomplete";
import { getPrimaryWalletAddress } from "@/lib/wallets/getPrimaryWalletAddress";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import { useRouter } from "next/navigation";

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
  const firstArtistAddress = firstArtist ? getPrimaryWalletAddress(firstArtist.wallets) : undefined;
  const userSearchData = useMemo(() => ({ artist: firstArtist }), [firstArtist]);

  const navigateTo = (address: string) => {
    setIsOpenModal(false);
    setIsExpandedSearchInput(false);
    push(`/${address}`);
  };

  const suffixHint = useMemo(() => {
    if (!firstArtist?.username) return "";
    return firstArtist.username.slice(searchKey.length);
  }, [firstArtist, searchKey]);

  const redirectToArtist = () => {
    if (!firstArtistAddress) return;
    setIsOpenModal(false);
    setIsExpandedSearchInput(false);
    push(`/${firstArtistAddress}`);
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
    artists,
    isLoadingSearch,
    onChangeSearchKey,
    onKeyDown,
    suffixHint,
    searchKey,
    redirectToArtist,
    navigateTo,
    isOpenModal,
    setIsOpenModal,
  };
};

export default useSearch;
