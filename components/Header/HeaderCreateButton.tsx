"use client";

import { CircleDot } from "lucide-react";
import { useRouter } from "next/navigation";

const HeaderCreateButton = () => {
  const { push } = useRouter();

  return (
    <button
      type="button"
      aria-label="Create"
      onClick={() => push("/create")}
      className="hidden items-center gap-1.5 rounded-[10px] bg-grey-moss-900 py-[9px] pl-[13px] pr-4 font-archivo-medium text-[13.5px] text-white transition-colors hover:bg-black md:inline-flex"
    >
      <CircleDot className="size-4" strokeWidth={2} />
      create
    </button>
  );
};

export default HeaderCreateButton;
