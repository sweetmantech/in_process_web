import { useRouter } from "next/navigation";
import HeaderSocialIcons from "./HeaderSocialIcons";

interface MobileHeaderMenuProps {
  onNavigate: () => void;
}

const NAV_ITEM_CLASS =
  "rounded-lg px-1.5 py-1 text-left font-archivo-medium text-[13.5px] text-[#4E4E4E] transition-colors hover:bg-grey-moss-50";

const MobileHeaderMenu = ({ onNavigate }: MobileHeaderMenuProps) => {
  const { push } = useRouter();

  return (
    <div className="absolute right-4 top-12 w-36 rounded-md border border-[#E4E0D7] bg-white p-2 shadow-lg">
      <div className="flex flex-col gap-0.5">
        <button
          type="button"
          className={NAV_ITEM_CLASS}
          onClick={() => {
            onNavigate();
            push("/manifesto");
          }}
        >
          Manifesto
        </button>
        <button
          type="button"
          className={NAV_ITEM_CLASS}
          onClick={() => {
            onNavigate();
            push("/faq");
          }}
        >
          FAQ
        </button>
      </div>
      <div className="border-t border-[#EDEAE2] py-2 pl-1">
        <HeaderSocialIcons />
      </div>
    </div>
  );
};

export default MobileHeaderMenu;
