"use client";

import { MomentMetadata } from "@/types/moment";
import useTextContent from "@/hooks/useTextContent";

interface TextMomentPreviewProps {
  data: MomentMetadata;
}

const TextMomentPreview = ({ data }: TextMomentPreviewProps) => {
  const text = useTextContent(data);

  return (
    <div className="absolute inset-0 z-[1] flex w-full items-center justify-center overflow-hidden bg-grey-eggshell p-5 text-center transition-transform duration-300 group-hover:scale-[1.02] md:p-7">
      <p className="line-clamp-[10] max-w-[88%] whitespace-pre-wrap break-words font-spectral text-[15px] leading-[1.65] text-grey-moss-900 md:text-[17px]">
        {text || data.description || data.name || "Text Moment"}
      </p>
    </div>
  );
};

export default TextMomentPreview;
