import { KeyboardEvent, useCallback, useEffect, useRef } from "react";

import useArtistAutocomplete from "@/hooks/useArtistAutocomplete";
import { SearchedArtist } from "@/lib/artists/searchArtists";

interface UseAnalyticsArtistSearchParams {
  onChanged: (value: string) => void;
  selectionField: "address" | "username";
}

const useAnalyticsArtistSearch = ({
  onChanged,
  selectionField,
}: UseAnalyticsArtistSearchParams) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { inputValue, setInputValue, isOpen, setIsOpen, artists, isLoading } =
    useArtistAutocomplete();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setIsOpen]);

  const handleSelect = useCallback(
    (artist: SearchedArtist) => {
      setInputValue(artist.username || artist.address);
      const emittedValue =
        selectionField === "username" ? artist.username || artist.address : artist.address;
      onChanged(emittedValue);
      setIsOpen(false);
    },
    [onChanged, selectionField, setInputValue, setIsOpen]
  );

  const handleKeyDown = useCallback(
    (e: KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Escape") {
        setIsOpen(false);
        return;
      }
      if (e.key === "Enter" && artists.length === 0) {
        onChanged(inputValue);
        setIsOpen(false);
      }
    },
    [artists.length, inputValue, onChanged, setIsOpen]
  );

  const handleInputChange = useCallback(
    (value: string) => {
      setInputValue(value);
      setIsOpen(true);
    },
    [setInputValue, setIsOpen]
  );

  const handleFocus = useCallback(() => {
    if (inputValue) setIsOpen(true);
  }, [inputValue, setIsOpen]);

  const showDropdown = isOpen && !!inputValue;

  return {
    containerRef,
    inputValue,
    artists,
    isLoading,
    showDropdown,
    handleSelect,
    handleKeyDown,
    handleInputChange,
    handleFocus,
  };
};

export default useAnalyticsArtistSearch;
