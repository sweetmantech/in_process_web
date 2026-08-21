"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ChainLogo from "@/components/MomentsGrid/ChainLogo";
import { cn } from "@/lib/utils";
import type { FilterSelectProps } from "@/types/artistFilters";

function FilterSelect<T extends string>({
  label,
  value,
  options,
  onChange,
  withChainLogo = false,
  active,
}: FilterSelectProps<T>) {
  const isActive = active ?? value !== "All";

  return (
    <Select value={value} onValueChange={(v) => onChange(v as T)}>
      <SelectTrigger
        className={cn(
          "h-auto min-h-0 w-auto gap-2 rounded-[12px] border px-3.5 py-2 font-archivo text-left shadow-none transition-all duration-150 focus:ring-0 focus:ring-offset-0",
          "[&>span]:!block [&>span]:overflow-visible [&>span]:whitespace-normal [&>span]:!line-clamp-none",
          "[&_svg]:size-3 [&_svg]:shrink-0 [&_svg]:opacity-55 [&_svg]:transition-transform [&[data-state=open]_svg]:rotate-180",
          isActive
            ? "border-tan-gold bg-tan-gold text-white"
            : "border-[#efece4] bg-[#efece4] text-[#1a1a18] data-[state=open]:border-[#1a1a18]"
        )}
      >
        <span className="text-[13px] font-medium leading-none">
          <span
            className={cn(
              "block font-mono text-[8px] font-normal uppercase tracking-[0.08em] leading-none",
              isActive ? "text-white/70" : "text-[#9a978e]"
            )}
          >
            {label}
          </span>
          <span className="mt-1 flex items-center gap-1 leading-none">
            <SelectValue />
          </span>
        </span>
      </SelectTrigger>
      <SelectContent
        className="min-w-[160px] rounded-[12px] border border-[#ddd8cd] bg-[#fbfaf7] p-1.5 shadow-[0_14px_34px_rgba(30,26,18,0.16)]"
        position="popper"
        sideOffset={8}
      >
        {options.map((option) => (
          <SelectItem
            key={option.label}
            value={option.label}
            className="cursor-pointer rounded-[8px] py-2 pl-2.5 pr-7 font-archivo text-[13px] text-[#1a1a18] focus:bg-[#efece4] focus:text-[#1a1a18] data-[highlighted]:bg-[#efece4] data-[state=checked]:bg-[#efece4] data-[state=checked]:font-medium"
          >
            <span className="flex items-center gap-1.5">
              {withChainLogo && option.label !== "All" ? (
                <ChainLogo chainId={Number(option.label)} />
              ) : null}
              {option.displayLabel}
            </span>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

export default FilterSelect;
