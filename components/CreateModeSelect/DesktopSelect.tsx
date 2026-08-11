import { useRouter, useSearchParams } from "next/navigation";
import useTypeParam from "@/hooks/useTypeParam";
import { getUrlWithType } from "@/lib/create/getUrlWithType";
import { cn } from "@/lib/utils";

const TABS = [
  { label: "new moment", type: undefined },
  { label: "new thought", type: "writing" },
  { label: "new link", type: "link" },
  { label: "new embed", type: "embed" },
] as const;

const DesktopSelect = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const type = useTypeParam();
  const baseRoute = "/create";

  const handleClick = (newType?: string) => {
    push(getUrlWithType(newType ?? null, searchParams.toString(), baseRoute));
  };

  const isActive = (tabType: string | undefined) =>
    tabType === undefined ? !type : type === tabType;

  return (
    <div className="mb-6 flex shrink-0 items-center gap-[30px] border-b-[1.5px] border-[#DCD6CA]">
      {TABS.map((tab) => {
        const active = isActive(tab.type);
        return (
          <button
            key={tab.label}
            type="button"
            onClick={() => handleClick(tab.type)}
            className={cn(
              "relative px-0.5 pb-3.5 font-archivo-medium text-[12.5px] uppercase tracking-[0.12em] transition-colors",
              active ? "text-grey-moss-900" : "text-[#A8A296] hover:text-grey-moss-900"
            )}
          >
            {tab.label}
            {active && (
              <span className="absolute inset-x-0 -bottom-px z-[1] h-0.5 bg-grey-moss-900" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default DesktopSelect;
