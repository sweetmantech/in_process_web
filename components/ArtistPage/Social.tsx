import React from "react";
import { validateUrl } from "@/lib/url/validateUrl";
import IconHint from "./IconHint";

interface SocialProps {
  link: string;
  icon: React.ReactNode;
  label: string;
}

const Social = ({ link, icon, label }: SocialProps) => {
  const handleClick = () => {
    if (validateUrl(link)) {
      window.open(link, "_blank", "noopener,noreferrer");
    }
  };

  return (
    <button
      className="group relative flex size-8 items-center justify-center rounded-full border border-[rgba(28,26,23,0.2)] bg-white/55 text-[#8a8578] transition-colors hover:border-[rgba(28,26,23,0.4)] hover:bg-white/75 hover:text-[#1c1a17] active:opacity-70"
      type="button"
      aria-label={label}
      onClick={handleClick}
    >
      {icon}
      <IconHint label={label} />
    </button>
  );
};

export default Social;
