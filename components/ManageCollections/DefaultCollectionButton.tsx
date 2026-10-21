import type { KeyboardEvent, MouseEvent } from "react";
import { useSetDefaultCollection } from "@/hooks/useSetDefaultCollection";

interface DefaultCollectionButtonProps {
  address: string;
  isDefault: boolean;
}

const stop = (e: MouseEvent | KeyboardEvent) => e.stopPropagation();

const DefaultCollectionButton = ({ address, isDefault }: DefaultCollectionButtonProps) => {
  const { setDefault, isPending } = useSetDefaultCollection();

  if (isDefault) {
    return (
      <span className="shrink-0 whitespace-nowrap font-archivo text-[10px] uppercase tracking-[0.07em] text-grey-moss-300">
        default
      </span>
    );
  }

  return (
    <button
      type="button"
      disabled={isPending}
      onKeyDown={stop}
      onClick={(e) => {
        stop(e);
        setDefault(address);
      }}
      className={`shrink-0 whitespace-nowrap font-archivo text-[10px] uppercase tracking-[0.07em] text-grey-moss-300 transition-[color,opacity] duration-150 hover:text-grey-moss-900 focus-visible:opacity-100 disabled:opacity-50 md:group-hover:opacity-100 ${isPending ? "md:opacity-100" : "md:opacity-0"}`}
    >
      {isPending ? "saving..." : "set as default"}
    </button>
  );
};

export default DefaultCollectionButton;
