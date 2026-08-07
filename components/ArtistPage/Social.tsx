import React from "react";
import { validateUrl } from "@/lib/url/validateUrl";

interface SocialProps {
  link: string;
  icon: React.ReactNode;
}

const Social = ({ link, icon }: SocialProps) => {
  const handleClick = () => {
    // Validate URL before opening to prevent phishing
    if (validateUrl(link)) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button
      className="flex size-8 items-center justify-center rounded-full border border-[rgba(28,26,23,0.2)] text-[#8a8578] transition-colors hover:border-[rgba(28,26,23,0.4)] hover:text-[#1c1a17] active:opacity-70"
      type="button"
      onClick={handleClick}
    >
      {icon}
    </button>
  );
};

export default Social;
