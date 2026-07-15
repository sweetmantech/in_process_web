"use client";

import { ArrowRight } from "@/components/ui/icons";
import { useRouter, usePathname } from "next/navigation";

interface NavButtonProps {
  label: string;
  href: string;
}

const NavButton = ({ label, href }: NavButtonProps) => {
  const { push } = useRouter();
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <button
      type="button"
      className={`flex shrink-0 items-center justify-center rounded-full border border-grey-moss-100 px-3.5 py-[7px] font-archivo-medium text-[11px] uppercase tracking-[0.07em] transition-colors md:w-full md:justify-between md:rounded-md md:border-none md:px-4 md:py-1 md:text-2xl md:normal-case md:tracking-normal ${
        isActive
          ? "bg-grey-moss-900 text-grey-eggshell"
          : "bg-white/75 text-grey-moss-300 hover:border-grey-moss-300 md:bg-transparent md:hover:bg-grey-eggshell"
      }`}
      onClick={() => push(href)}
    >
      <p className="whitespace-nowrap md:text-2xl">{label}</p>
      <ArrowRight className={`hidden size-4 md:block ${isActive ? "text-grey-eggshell" : ""}`} />
    </button>
  );
};

export default NavButton;
