"use client";

import { LucideIcon } from "lucide-react";
import { useRouter, usePathname } from "next/navigation";

interface NavButtonProps {
  label: string;
  href: string;
  icon: LucideIcon;
}

const NavButton = ({ label, href, icon: Icon }: NavButtonProps) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <button
      type="button"
      className={`flex shrink-0 items-center gap-[11px] rounded-full border border-grey-moss-100 px-3.5 py-[7px] font-archivo-medium text-[11px] uppercase tracking-[0.07em] transition-colors md:w-full md:rounded-[9px] md:border-none md:px-3 md:py-2.5 md:text-[12.5px] ${
        isActive
          ? "bg-grey-moss-900 text-grey-eggshell md:bg-white md:text-grey-moss-900"
          : "bg-white/75 text-grey-moss-300 hover:border-grey-moss-300 md:bg-transparent md:hover:bg-white/75"
      }`}
      onClick={() => push(href)}
    >
      <Icon className="hidden size-[17px] md:block" />
      <p className="whitespace-nowrap">{label}</p>
    </button>
  );
};

export default NavButton;
