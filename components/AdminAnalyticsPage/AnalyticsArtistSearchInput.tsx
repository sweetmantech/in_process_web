"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

interface AnalyticsArtistSearchInputProps {
  value: string;
  onValueChange: (value: string) => void;
  onCommit: () => void;
  placeholder?: string;
  inputClassName?: string;
}

const AnalyticsArtistSearchInput = ({
  value,
  onValueChange,
  onCommit,
  placeholder = "Username or address",
  inputClassName = "h-7 w-44 rounded-full pl-3 pr-8 text-xs",
}: AnalyticsArtistSearchInputProps) => {
  return (
    <div className="relative">
      <Input
        className={inputClassName}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onValueChange(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && onCommit()}
      />
      <button
        type="button"
        onClick={onCommit}
        className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
      >
        <Search className="h-3.5 w-3.5" />
      </button>
    </div>
  );
};

export default AnalyticsArtistSearchInput;
