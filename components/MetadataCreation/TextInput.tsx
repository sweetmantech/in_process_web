import { useMetadataFormProvider } from "@/providers/MetadataFormProvider";
import { useMomentCreateProvider } from "@/providers/MomentCreateProvider/MomentCreateProvider";
import { ChangeEvent, useState } from "react";

type ScrollPosition = "top" | "mid" | "bottom" | null;

const TextInput = () => {
  const { writingText, setWritingText } = useMetadataFormProvider();
  const { creating } = useMomentCreateProvider();
  const [scrollPosition, setScrollPosition] = useState<ScrollPosition>(null);

  const handleScroll = (e: React.UIEvent<HTMLTextAreaElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLTextAreaElement;
    const position: ScrollPosition =
      scrollTop === 0 ? "top" : scrollHeight - scrollTop - clientHeight <= 5 ? "bottom" : "mid";
    setScrollPosition(position);
  };

  return (
    <div className="relative flex size-full overflow-hidden border border-[#E4E0D7] bg-white shadow-[0_20px_50px_-24px_rgba(27,21,4,0.3)] md:rounded-md">
      <textarea
        className="relative z-[2] size-full resize-none bg-transparent p-4 font-spectral text-base leading-[1.7] text-grey-moss-900 outline-none placeholder:text-[#B4AEA2] disabled:cursor-not-allowed md:p-12 md:px-14 md:text-[20px]"
        value={writingText}
        placeholder="yesterday i..."
        disabled={Boolean(creating)}
        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => {
          setWritingText(e.target.value);
        }}
        onScroll={handleScroll}
      />
      {scrollPosition && (
        <>
          {scrollPosition !== "top" && (
            <div className="pointer-events-none absolute left-0 top-0 z-[3] h-24 w-full bg-gradientTopBottom" />
          )}
          {scrollPosition !== "bottom" && (
            <div className="pointer-events-none absolute bottom-0 left-0 z-[3] h-24 w-full bg-gradientBottomTop" />
          )}
        </>
      )}
    </div>
  );
};

export default TextInput;
