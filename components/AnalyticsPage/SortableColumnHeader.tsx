"use client";

import { Column } from "@tanstack/react-table";

type SortableColumnHeaderSize = "default" | "compact";

interface SortableColumnHeaderProps<TData> {
  title: string;
  column: Column<TData, unknown>;
  align?: "left" | "right";
  size?: SortableColumnHeaderSize;
}

const SortableColumnHeader = <TData,>({
  title,
  column,
  align = "left",
  size = "default",
}: SortableColumnHeaderProps<TData>) => {
  const sorted = column.getIsSorted();
  const caret = sorted === "asc" ? "↑" : sorted === "desc" ? "↓" : "⇅";
  const compact = size === "compact";

  return (
    <button
      type="button"
      className={`inline-flex w-full items-center gap-1.5 uppercase tracking-[0.11em] ${
        align === "right" ? "justify-end" : "justify-start"
      } ${sorted ? "text-[#1B1504]" : "text-[#6B6456] hover:text-[#1B1504]"} ${
        compact ? "text-[10px]" : "text-[10.5px] font-semibold"
      }`}
      onClick={() => {
        const current = column.getIsSorted();
        column.toggleSorting(current !== "desc");
      }}
    >
      {title}
      <span
        className={`shrink-0 text-[11px] leading-none ${
          sorted ? "text-[#A8862F]" : "text-[#C9C5BB]"
        }`}
      >
        {caret}
      </span>
    </button>
  );
};

export default SortableColumnHeader;
