"use client";

import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";
import { ChevronDown } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";

const OPTIONS = [
  { value: "eth", label: "ETH" },
  { value: "usdc", label: "USD" },
] as const;

export default function CurrencySelect() {
  const { form } = useMetadataFormProvider();
  const { creating } = useMomentCreateProvider();
  const { isCreating } = useBulkCreateProvider();
  const disabled = Boolean(creating) || isCreating;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const priceUnit = form.watch("priceUnit");
  const current = OPTIONS.find((o) => o.value === priceUnit) ?? OPTIONS[1];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  return (
    <div ref={rootRef} className="relative shrink-0">
      <button
        type="button"
        disabled={disabled}
        onClick={() => setOpen((v) => !v)}
        className="inline-flex items-center gap-1.5 rounded-[9px] border border-[#DCD6CA] bg-white px-2.5 py-1.5 font-archivo-bold text-[13px] text-grey-moss-900 disabled:opacity-50"
      >
        {current.label}
        <ChevronDown className="size-3.5 text-[#A8A296]" strokeWidth={1.75} />
      </button>
      {open && (
        <div className="absolute right-0 top-[38px] z-30 w-24 rounded-[10px] border border-[#E4E0D7] bg-white p-1 shadow-[0_16px_34px_-14px_rgba(27,21,4,0.32)]">
          {OPTIONS.map((option) => {
            const selected = option.value === priceUnit;
            return (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  form.setValue("priceUnit", option.value, { shouldValidate: true });
                  setOpen(false);
                }}
                className={cn(
                  "w-full rounded-[7px] px-2.5 py-2 text-left font-archivo-medium text-[13px]",
                  selected ? "bg-[#2F6BFF] text-white" : "text-grey-moss-900 hover:bg-[#F6F4EF]"
                )}
              >
                {option.label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
