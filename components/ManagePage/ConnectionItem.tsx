import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface ConnectionItemProps {
  icon: LucideIcon;
  label: string;
  connected: boolean;
  meta?: ReactNode;
  isLast?: boolean;
  children: ReactNode;
}

const ConnectionItem = ({
  icon: Icon,
  label,
  connected,
  meta,
  isLast,
  children,
}: ConnectionItemProps) => (
  <div
    className={`flex items-center justify-between gap-2.5 pt-3 md:gap-3.5 md:pt-3.5 ${isLast ? "pb-0.5 md:pb-1" : "border-b border-grey-moss-50 pb-3 md:pb-3.5"}`}
  >
    <div className="flex min-w-0 items-center gap-2.5 md:gap-3">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-grey-moss-50 text-grey-moss-300 md:h-9 md:w-9 md:rounded-[10px]">
        <Icon className="size-[15px] md:size-[17px]" />
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[13.5px] text-grey-moss-900 md:gap-2 md:text-sm">
          {label}
          {connected && (
            <>
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#7FD58A] md:hidden" />
              <span className="hidden shrink-0 items-center gap-[5px] rounded-xl bg-grey-moss-50 px-[9px] py-[2px] text-[9px] uppercase tracking-[0.05em] text-grey-moss-900 md:inline-flex">
                <span className="h-1.5 w-1.5 rounded-full bg-[#7FD58A]" />
                connected
              </span>
            </>
          )}
        </div>
        {meta && (
          <div className="mt-px truncate text-[11.5px] text-grey-moss-300 md:mt-0.5 md:text-xs">
            {meta}
          </div>
        )}
      </div>
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

export default ConnectionItem;
