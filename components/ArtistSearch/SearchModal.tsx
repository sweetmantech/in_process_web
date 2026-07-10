import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import useSearch from "@/hooks/useSearch";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { Search, ArrowUpRight, X } from "lucide-react";
import { getPrimaryWalletAddress } from "@/lib/wallets/getPrimaryWalletAddress";
import truncateAddress from "@/lib/truncateAddress";

const SearchModal = () => {
  const {
    artists,
    isLoadingSearch,
    searchKey,
    onChangeSearchKey,
    onKeyDown,
    navigateTo,
    isOpenModal,
    setIsOpenModal,
  } = useSearch();

  return (
    <Dialog open={isOpenModal} onOpenChange={setIsOpenModal}>
      <DialogTrigger
        asChild
        className="disabled:cursor-not-allowed disabled:bg-grey-moss-300"
        onClick={() => setIsOpenModal(true)}
      >
        <button
          type="button"
          className="flex w-[220px] items-center gap-2.5 rounded-xl border border-grey-moss-100 bg-grey-moss-50 px-3.5 py-2.5 text-grey-moss-200 transition-colors hover:bg-grey-moss-100 lg:w-[300px]"
        >
          <Search className="size-[17px] shrink-0" strokeWidth={1.75} />
          <span className="font-archivo text-[13.5px]">search artist</span>
        </button>
      </DialogTrigger>
      <DialogContent className="max-w-md !gap-0 overflow-hidden !rounded-lg border-none !bg-white p-0 shadow-lg">
        <VisuallyHidden>
          <DialogTitle>Search</DialogTitle>
        </VisuallyHidden>
        <div className="flex items-center gap-3 px-5 py-4">
          <Search className="size-5 shrink-0 text-grey-moss-400" strokeWidth={1.75} />
          <input
            type="text"
            placeholder="Search artist"
            className="min-w-0 flex-1 border-none font-archivo text-[15px] text-grey-moss-900 outline-none placeholder-grey-moss-300"
            value={searchKey}
            onChange={onChangeSearchKey}
            onKeyDown={onKeyDown}
            autoFocus
          />
          <button
            type="button"
            onClick={() => setIsOpenModal(false)}
            className="flex shrink-0 items-center justify-center rounded-full bg-grey-moss-50 p-1.5 text-grey-moss-400 transition-colors hover:bg-grey-moss-100"
          >
            <X className="size-4" strokeWidth={1.75} />
          </button>
        </div>

        <div className="h-[420px] overflow-y-auto border-t border-grey-moss-100 px-5 py-4">
          <p className="font-archivo text-xs tracking-wide text-grey-moss-300">ARTISTS</p>

          {!isLoadingSearch && artists.length === 0 && (
            <p className="py-4 font-archivo text-sm text-grey-moss-300">No results.</p>
          )}

          <div className="mt-2 flex flex-col">
            {artists.map((artist, i) => {
              const address = getPrimaryWalletAddress(artist.wallets);
              if (!address || !artist.username) return null;
              return (
                <button
                  key={i}
                  type="button"
                  onClick={() => navigateTo(address)}
                  className="flex items-center gap-3 rounded-xl px-2 py-3 text-left transition-colors hover:bg-grey-moss-50"
                >
                  <span className="size-9 shrink-0 rounded-full bg-gradient-to-br from-pink-400 to-purple-400" />
                  <span className="flex flex-1 flex-col">
                    <span className="font-archivo-medium text-[15px] text-grey-moss-900">
                      {artist.username}
                    </span>
                    <span className="font-archivo text-[13px] text-grey-moss-300">
                      {truncateAddress(address)}
                    </span>
                  </span>
                  <ArrowUpRight className="size-4 shrink-0 text-grey-moss-300" strokeWidth={1.75} />
                </button>
              );
            })}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default SearchModal;
