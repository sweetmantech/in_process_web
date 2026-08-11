"use client";

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

const CreateTypeTabs = () => {
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
    <div className="no-scrollbar -mx-1 mb-4 flex shrink-0 items-center gap-[22px] overflow-x-auto overflow-y-hidden border-b-[1.5px] border-[#DCD6CA] px-1 md:mx-0 md:mb-6 md:gap-[30px] md:overflow-visible">
      {TABS.map((tab) => {
        const active = isActive(tab.type);
        return (
          <button
            key={tab.label}
            type="button"
            onClick={() => handleClick(tab.type)}
            className={cn(
              "relative shrink-0 whitespace-nowrap px-0.5 pb-3 font-archivo-medium text-[11px] uppercase tracking-[0.1em] transition-colors md:pb-3.5 md:text-[12.5px] md:tracking-[0.12em]",
              active ? "text-grey-moss-900" : "text-[#A8A296] hover:text-grey-moss-900"
            )}
          >
            {tab.label}
            {active && (
              <span className="absolute inset-x-0 -bottom-px z-[1] h-0.5 bg-grey-moss-900 md:-bottom-px" />
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CreateTypeTabs;
