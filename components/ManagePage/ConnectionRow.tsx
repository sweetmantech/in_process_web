import { ReactNode } from "react";
import { LucideIcon } from "lucide-react";

interface ConnectionRowProps {
  icon: LucideIcon;
  label: string;
  connected: boolean;
  meta?: ReactNode;
  isLast?: boolean;
  children: ReactNode;
}

const ConnectionRow = ({
  icon: Icon,
  label,
  connected,
  meta,
  isLast,
  children,
}: ConnectionRowProps) => (
  <div
    className={`flex items-center justify-between gap-2.5 pt-3 ${isLast ? "pb-0.5" : "border-b border-grey-moss-50 pb-3"}`}
  >
    <div className="flex min-w-0 items-center gap-2.5">
      <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-[9px] bg-grey-moss-50 text-grey-moss-300">
        <Icon className="size-[15px]" />
      </span>
      <div className="min-w-0">
        <div className="flex items-center gap-1.5 text-[13.5px] font-semibold text-grey-moss-900">
          {label}
          {connected && <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#7FD58A]" />}
        </div>
        {meta && <div className="mt-px truncate text-[11.5px] text-grey-moss-300">{meta}</div>}
      </div>
    </div>
    <div className="shrink-0">{children}</div>
  </div>
);

export default ConnectionRow;
