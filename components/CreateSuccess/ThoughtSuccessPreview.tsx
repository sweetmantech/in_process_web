"use client";

import useTextContent from "@/hooks/useTextContent";
import { MomentMetadata } from "@/types/moment";

interface ThoughtSuccessPreviewProps {
  text: string;
  metadata: MomentMetadata;
}

const ThoughtSuccessPreview = ({ text, metadata }: ThoughtSuccessPreviewProps) => {
  const metadataText = useTextContent(metadata);
  const displayText = text.trim() || metadataText.trim() || metadata.description?.trim() || "";

  return (
    <div className="flex size-full items-center justify-center bg-white p-6 md:p-8">
      <p className="max-w-[88%] whitespace-pre-wrap break-words text-center font-spectral text-[17px] leading-[1.7] text-grey-moss-900 md:text-[20px]">
        {displayText || "Thought"}
      </p>
    </div>
  );
};

export default ThoughtSuccessPreview;
