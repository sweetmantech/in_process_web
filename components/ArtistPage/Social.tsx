import React from "react";
import { validateUrl } from "@/lib/url/validateUrl";
import { cn } from "@/lib/utils";

interface SocialProps {
  link: string;
  icon: React.ReactNode;
  variant?: "default" | "subtle";
}

const Social = ({ link, icon, variant = "default" }: SocialProps) => {
  const handleClick = () => {
    // Validate URL before opening to prevent phishing
    if (validateUrl(link)) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button
      className={cn(
        "flex items-center justify-center transition-colors",
        variant === "subtle"
          ? "size-8 rounded-full border border-[rgba(28,26,23,0.2)] text-[#8a8578] hover:border-[rgba(28,26,23,0.4)] hover:text-[#1c1a17] active:opacity-70"
          : "size-7 rounded-md bg-grey-primary md:size-9"
      )}
      type="button"
      onClick={handleClick}
    >
      {icon}
    </button>
  );
};

export default Social;
