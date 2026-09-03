"use client";

import { Search } from "lucide-react";

import { Command, CommandItem, CommandList, CommandPrimitive } from "@/components/ui/command";
import useAnalyticsArtistSearch from "@/hooks/useAnalyticsArtistSearch";
import { getPrimaryWalletAddress } from "@/lib/wallets/getPrimaryWalletAddress";
import truncateAddress from "@/lib/utils/truncateAddress";
import { cn } from "@/lib/utils";

interface AnalyticsArtistSearchInputProps {
  onChanged: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
  selectionField?: "address" | "username";
  iconPosition?: "left" | "right";
}

const AnalyticsArtistSearchInput = ({
  onChanged,
  placeholder = "Artist name or address",
  inputClassName,
  selectionField = "address",
  iconPosition = "right",
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

  const isLeftIcon = iconPosition === "left";

  return (
    <Command shouldFilter={false} className="relative w-fit overflow-visible bg-transparent">
      <div
        ref={containerRef}
        className={cn(
          "relative",
          isLeftIcon &&
            "flex items-center gap-2 rounded-[20px] border border-[#E4E0D7] bg-white py-0 pl-3.5 pr-1.5"
        )}
      >
        {isLeftIcon ? (
          <span className="pointer-events-none shrink-0 text-[#B6B2A8]" aria-hidden>
            <Search className="size-[15px]" />
          </span>
        ) : null}
        <CommandPrimitive.Input
          value={inputValue}
          onValueChange={handleInputChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "ring-0 placeholder:text-[#B6B2A8] focus-visible:outline-none",
            isLeftIcon
              ? "h-auto w-[190px] border-none bg-transparent py-[9px] text-[13px] text-[#1B1504]"
              : "border border-[#E4E0D7] bg-white text-[#1B1504] h-7 w-44 rounded-full pl-3 pr-8 text-xs",
            inputClassName
          )}
        />
        {!isLeftIcon ? (
          <span
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
            aria-hidden
            title="Press Enter to search"
          >
            <Search className="h-3.5 w-3.5" />
          </span>
        ) : null}
        {showDropdown && (
          <CommandList className="absolute left-0 right-0 top-full z-50 mt-1 max-h-60 overflow-auto rounded-md border border-[#E4E0D7] bg-white shadow-lg">
            {isLoading && <div className="px-3 py-2 text-xs text-[#6B6456]">Searching…</div>}
            {!isLoading && artists.length === 0 && (
              <div className="px-3 py-2 text-xs text-[#6B6456]">No artists found</div>
            )}
            {!isLoading &&
              artists.map((artist) => {
                const address = getPrimaryWalletAddress(artist.wallets);
                if (!address) return null;

                return (
                  <CommandItem
                    key={address}
                    value={address}
                    onSelect={() => handleSelect(artist)}
                    className="flex w-full cursor-pointer flex-col items-start gap-0.5 rounded-none px-3 py-1.5"
                  >
                    <span className="truncate text-xs font-medium">
                      {artist.username || truncateAddress(address)}
                    </span>
                  </CommandItem>
                );
              })}
          </CommandList>
        )}
      </div>
    </Command>
  );
};

export default AnalyticsArtistSearchInput;
