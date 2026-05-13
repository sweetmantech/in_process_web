"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

interface AnalyticsArtistSearchInputProps {
  onChanged: (value: string) => void;
  placeholder?: string;
  inputClassName?: string;
}

const AnalyticsArtistSearchInput = ({
  onChanged,
  placeholder = "Username or address — press Enter",
  inputClassName = "h-7 w-44 rounded-full pl-3 pr-8 text-xs",
}: AnalyticsArtistSearchInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");
  return (
    <div className="relative">
      <Input
        className={inputClassName}
        placeholder={placeholder}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onChanged(inputValue)}
      />
      <span
        className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground"
        aria-hidden
        title="Press Enter to search"
      >
        <Search className="h-3.5 w-3.5" />
      </span>
    </div>
  );
};

export default AnalyticsArtistSearchInput;
