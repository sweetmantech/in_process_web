import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import searchArtists, { SearchArtistsResponse, SearchedArtist } from "@/lib/artists/searchArtists";

const useArtistAutocomplete = () => {
  const [inputValue, setInputValue] = useState<string>("");
  const [debouncedValue, setDebouncedValue] = useState<string>("");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(inputValue), 250);
    return () => clearTimeout(timer);
  }, [inputValue]);

  const { data, isFetching } = useQuery<SearchArtistsResponse>({
    queryKey: ["artistAutocomplete", debouncedValue],
    queryFn: () => searchArtists(debouncedValue),
    enabled: !!debouncedValue,
    staleTime: 1000 * 30,
  });

  const artists: SearchedArtist[] = useMemo(() => {
    const list = data?.artists ?? [];
    const seen = new Set<string>();
    return list.filter((artist) => {
      const key = artist.username
        ? `username:${artist.username.toLowerCase()}`
        : `address:${artist.address.toLowerCase()}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [data?.artists]);

  return {
    inputValue,
    setInputValue,
    isOpen,
    setIsOpen,
    artists,
    isLoading: isFetching && !!debouncedValue,
  };
};

export default useArtistAutocomplete;
