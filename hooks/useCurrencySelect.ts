"use client";

import { useEffect, useRef, useState } from "react";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useBulkCreateProvider } from "@/providers/BulkCreateProvider";

export const CURRENCY_OPTIONS = [
  { value: "eth", label: "ETH" },
  { value: "usdc", label: "USD" },
] as const;

export type CurrencyOptionValue = (typeof CURRENCY_OPTIONS)[number]["value"];

const useCurrencySelect = () => {
  const { form } = useMetadataFormProvider();
  const { creating } = useMomentCreateProvider();
  const { isCreating } = useBulkCreateProvider();
  const disabled = Boolean(creating) || isCreating;
  const [open, setOpen] = useState(false);
  const rootRef = useRef<HTMLDivElement>(null);
  const priceUnit = form.watch("priceUnit");
  const current = CURRENCY_OPTIONS.find((o) => o.value === priceUnit) ?? CURRENCY_OPTIONS[1];

  useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: PointerEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onPointerDown);
    return () => document.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const toggleOpen = () => setOpen((v) => !v);

  const selectCurrency = (value: CurrencyOptionValue) => {
    form.setValue("priceUnit", value, { shouldValidate: true });
    setOpen(false);
  };

  return {
    disabled,
    open,
    rootRef,
    priceUnit,
    current,
    options: CURRENCY_OPTIONS,
    toggleOpen,
    selectCurrency,
  };
};

export default useCurrencySelect;
