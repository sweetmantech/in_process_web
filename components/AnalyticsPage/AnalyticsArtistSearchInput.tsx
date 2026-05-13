"use client";

import { Search } from "lucide-react";

import { Command, CommandItem, CommandList, CommandPrimitive } from "@/components/ui/command";
import useAnalyticsArtistSearch from "@/hooks/useAnalyticsArtistSearch";
import truncateAddress from "@/lib/truncateAddress";
import { cn } from "@/lib/utils";

interface AnalyticsArtistSearchInputProps {
  onChanged: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
  selectionField?: "address" | "username";
}

const AnalyticsArtistSearchInput = ({
  onChanged,
  placeholder = "Artist name or address",
  inputClassName = "h-7 w-44 rounded-full pl-3 pr-8 text-xs",
  selectionField = "address",
}: AnalyticsArtistSearchInputProps) => {
  const {
    containerRef,
    inputValue,
    artists,
    isLoading,
    showDropdown,
    handleSelect,
    handleKeyDown,
    handleInputChange,
    handleFocus,
  } = useAnalyticsArtistSearch({ onChanged, selectionField });

  return (
    <Command shouldFilter={false} className="relative w-fit overflow-visible bg-transparent">
      <div ref={containerRef} className="relative">
        <CommandPrimitive.Input
          value={inputValue}
          onValueChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "placeholder:text-muted-foreground border border-grey-secondary bg-white ring-0 focus-visible:outline-none",
            inputClassName
          )}
        />
        <span
          className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
          aria-hidden
          title="Press Enter to search"
        >
          <Search className="h-3.5 w-3.5" />
        </span>
        {showDropdown && (
          <CommandList className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-md border border-grey-secondary bg-white shadow-lg">
            {isLoading && <div className="px-3 py-2 text-xs text-muted-foreground">Searching…</div>}
            {!isLoading && artists.length === 0 && (
              <div className="px-3 py-2 text-xs text-muted-foreground">No artists found</div>
            )}
            {!isLoading &&
              artists.map((artist) => (
                <CommandItem
                  key={artist.address}
                  value={artist.address}
                  onSelect={() => handleSelect(artist)}
                  className="flex w-full cursor-pointer flex-col items-start gap-0.5 rounded-none px-3 py-1.5"
                >
                  <span className="truncate text-xs font-medium">
                    {artist.username || truncateAddress(artist.address)}
                  </span>
                </CommandItem>
              ))}
          </CommandList>
        )}
      </div>
    </Command>
  );
};

export default AnalyticsArtistSearchInput;
