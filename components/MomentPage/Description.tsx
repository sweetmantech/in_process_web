import { useState } from "react";
import { useMomentProvider } from "@/providers/MomentProvider";

const Description = () => {
  const { metadata } = useMomentProvider();
  const description = metadata?.description || "";
  const [isExpanded, setIsExpanded] = useState(false);

  if (!description) return null;

  const shouldTruncate = description.length > 130;

  return (
    <div className="mt-2.5 max-w-[560px]">
      <p
        className={`font-spectral text-[13.5px] leading-normal text-grey-moss-400 md:text-[15px] ${
          !isExpanded && shouldTruncate ? "line-clamp-2" : ""
        }`}
      >
        {description}
      </p>
      {shouldTruncate && (
        <button
          type="button"
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-1 p-0 font-archivo-medium text-xs text-tan-gold transition-colors hover:text-grey-moss-900"
        >
          {isExpanded ? "show less" : "show more"}
        </button>
      )}
    </div>
  );
};

export default Description;
