import { useMiniAppProvider } from "@/providers/MiniAppProvider";
import { useRouter } from "next/navigation";
import Divider from "./Divider";
import { useLayoutProvider } from "@/providers/LayoutProvider";
import { usePrivy } from "@privy-io/react-auth";
import { useWalletsProvider } from "@/providers/WalletsProvider";
import { Clock, Settings, LogOut } from "lucide-react";
import TopupMenuItem from "../Balances/TopupMenuItem";

const ITEM_CLASS =
  "flex w-full items-center gap-3 whitespace-nowrap px-3 py-2 text-left text-sm text-white transition-colors hover:bg-[#333333]";

export function DropdownMenu() {
  const { isMiniApp } = useMiniAppProvider();
  const { push } = useRouter();
  const { toggleNavbar } = useLayoutProvider();
  const { logout } = usePrivy();
  const { primaryWallet } = useWalletsProvider();

  return (
    <div className="absolute right-0 top-full mt-1 h-fit overflow-hidden rounded-md bg-grey-moss-900 font-archivo shadow-lg p-1">
      <button
        onClick={() => {
          toggleNavbar();
          push(`/${primaryWallet}`);
        }}
        className={ITEM_CLASS}
      >
        <Clock className="size-4 shrink-0 opacity-60" strokeWidth={1.5} />
        Timeline
      </button>
      <Divider />
      <button
        onClick={() => {
          toggleNavbar();
          push("/manage");
        }}
        className={ITEM_CLASS}
      >
        <Settings className="size-4 shrink-0 opacity-60" strokeWidth={1.5} />
        Manage
      </button>
      <Divider />
      <TopupMenuItem
        className={ITEM_CLASS}
        iconClassName="size-4 shrink-0 opacity-60"
        onClick={() => {
          toggleNavbar();
          push("/topup");
        }}
      />
      {!isMiniApp && (
        <>
          <Divider />
          <button
            onClick={() => {
              toggleNavbar();
              logout();
            }}
            className={ITEM_CLASS}
          >
            <LogOut className="size-4 shrink-0 text-white/40" strokeWidth={1.5} />
            Log out
          </button>
        </>
      )}
    </div>
  );
}
