import { useRef, useEffect } from "react";
import { X, Search } from "lucide-react";
import { SearchedArtist } from "@/lib/artists/searchArtists";
import { getPrimaryWalletAddress } from "@/lib/wallets/getPrimaryWalletAddress";
import truncateAddress from "@/lib/truncateAddress";
import { KeyboardEvent, ChangeEvent } from "react";

interface SearchDrawerPanelProps {
  isOpen: boolean;
  onClose: () => void;
  searchKey: string;
  suffixHint: string;
  artists: SearchedArtist[];
  isLoading: boolean;
  onChangeSearchKey: (e: ChangeEvent<HTMLInputElement>) => void;
  onKeyDown: (e: KeyboardEvent<HTMLInputElement>) => void;
  navigateTo: (address: string) => void;
}

const SearchDrawerPanel = ({
  isOpen,
  onClose,
  searchKey,
  suffixHint,
  artists,
  isLoading,
  onChangeSearchKey,
  onKeyDown,
  navigateTo,
}: SearchDrawerPanelProps) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 300);
  }, [isOpen]);

  return (
    <div
      className={`fixed bottom-[calc(74px+env(safe-area-inset-bottom,0px))] left-0 right-0 top-0 z-50 flex flex-col bg-white transition-transform duration-300 ease-out will-change-transform ${
        isOpen ? "translate-y-0" : "pointer-events-none translate-y-[2000px]"
      }`}
    >
      <div className="flex items-center gap-3 border-b border-grey-moss-100 px-5">
        <Search className="size-5 shrink-0 text-grey-moss-400" strokeWidth={1.75} />
        <div className="relative min-w-0 flex-1">
          <input
            ref={inputRef}
            type="text"
            placeholder="Search artists"
            className="w-full appearance-none border-0 bg-transparent py-4 font-archivo text-[17px] leading-none outline-none placeholder:text-grey-moss-300"
            value={searchKey}
            onChange={onChangeSearchKey}
            onKeyDown={onKeyDown}
          />
          {suffixHint && (
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center py-4">
              <span className="font-archivo text-[17px] leading-none opacity-0">{searchKey}</span>
              <span className="font-archivo text-[17px] leading-none text-grey-moss-300">
                {suffixHint}
              </span>
            </div>
          )}
        </div>
        <button
          type="button"
          onClick={onClose}
          className="flex shrink-0 self-stretch items-center text-grey-moss-400"
        >
          <X className="size-5" strokeWidth={1.5} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {!isLoading && artists.length === 0 && (
          <p className="px-5 py-4 font-archivo text-sm text-grey-moss-300">No results.</p>
        )}
        {artists.map((artist, i) => {
          const address = getPrimaryWalletAddress(artist.wallets);
          if (!address) return null;
          return (
            <button
              key={i}
              type="button"
              onClick={() => navigateTo(address)}
              className="flex w-full items-center gap-3 border-b border-grey-moss-100 px-5 py-4 text-left active:bg-grey-moss-50"
            >
              <div className="flex flex-col">
                {artist.username && (
                  <span className="font-archivo text-[15px] text-grey-moss-900">
                    {artist.username}
                  </span>
                )}
                <span className="font-archivo text-[13px] text-grey-moss-400">
                  {truncateAddress(address)}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default SearchDrawerPanel;
