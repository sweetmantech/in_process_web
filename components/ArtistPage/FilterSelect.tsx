"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import type { FilterSelectProps } from "@/types/artistFilters";

function FilterSelect<T extends string>({ label, value, options, onChange }: FilterSelectProps<T>) {
  const isActive = value !== "All";

  return (
    <Select value={value} onValueChange={(v) => onChange(v as T)}>
      <SelectTrigger
        className={cn(
          "h-auto min-h-0 w-auto gap-1.5 rounded-[12px] border px-2.5 py-1 font-spectral text-left shadow-none transition-all duration-150 focus:ring-0 focus:ring-offset-0 [&>span]:line-clamp-none",
          "[&_svg]:size-3 [&_svg]:shrink-0 [&_svg]:opacity-55 [&_svg]:transition-transform [&[data-state=open]_svg]:rotate-180",
          isActive
            ? "border-[#c05a2a] bg-[#c05a2a] text-white"
            : "border-[#efece4] bg-[#efece4] text-[#1a1a18] data-[state=open]:border-[#1a1a18]"
        )}
      >
        <span className="flex flex-col items-start text-[13px] font-medium leading-[1.1]">
          <span
            className={cn(
              "font-mono text-[8px] font-normal uppercase tracking-[0.08em]",
              isActive ? "text-white/70" : "text-[#9a978e]"
            )}
          >
            {label}
          </span>
          <SelectValue />
        </span>
      </SelectTrigger>
      <SelectContent
        className="min-w-[160px] rounded-[12px] border border-[#ddd8cd] bg-[#fbfaf7] p-1 shadow-[0_14px_34px_rgba(30,26,18,0.16)]"
        position="popper"
      >
        {options.map((option) => (
          <SelectItem
            key={option.label}
            value={option.label}
            className="cursor-pointer rounded-[8px] py-1.5 pl-2.5 pr-7 text-[13px] text-[#1a1a18] focus:bg-[#efece4] focus:text-[#1a1a18] data-[highlighted]:bg-[#efece4] data-[state=checked]:bg-[#efece4] data-[state=checked]:font-medium"
          >
            {option.displayLabel}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default FilterSelect;
