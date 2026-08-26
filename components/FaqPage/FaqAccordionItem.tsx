"use client";

import type { FaqItem } from "@/lib/faq/faqContent";
import { faqItemKey } from "@/lib/faq/faqContent";
import { faqItemGalleries } from "@/lib/faq/faqItemGalleries";
import HeaderSocialIcons from "@/components/Header/HeaderSocialIcons";
import ImageGallery from "./ImageGallery";
import { RenderLine } from "./RenderLine";

interface FaqAccordionItemProps {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
  fallbackKey: string;
}

const FaqAccordionItem = ({ item, open, onToggle, fallbackKey }: FaqAccordionItemProps) => {
  const id = faqItemKey(item, fallbackKey);
  const galleries = item.id ? faqItemGalleries[item.id] : undefined;
  const isCommunity = item.id === "community";
  const hasBody = Boolean(item.answer) || Boolean(galleries?.length) || isCommunity;

  return (
    <div id={id} className="scroll-mt-28 border-b border-[#E4E0D7] md:scroll-mt-24">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={open}
        className="flex w-full cursor-pointer items-baseline gap-[18px] px-0.5 py-[22px] text-left"
      >
        <span
          className={`flex-1 font-archivo text-[16px] font-medium leading-[1.4] tracking-[-0.01em] md:text-[17.5px] ${
            open ? "text-[#1B1504]" : "text-[#34332F]"
          }`}
        >
          {item.question}
        </span>
        <span aria-hidden className="shrink-0 text-[20px] font-light leading-none text-[#B6B2A8]">
          {open ? "–" : "+"}
        </span>
      </button>
      {open && hasBody ? (
        <div className="flex flex-col gap-8 px-0.5 pb-7 pr-2 md:pr-6">
          {item.answer ? (
            <div className="whitespace-pre-line pr-4 md:pr-6 [&_a]:text-[#A8862F] [&_a]:underline-offset-2 hover:[&_a]:text-[#1B1504] hover:[&_a]:underline">
              {item.answer.split("\n").map((line, lineIndex) => RenderLine(line, lineIndex))}
            </div>
          ) : null}
          {isCommunity ? <HeaderSocialIcons /> : null}
          {galleries?.map((gallery, index) => (
            <ImageGallery
              key={index}
              images={gallery.images}
              columns={gallery.columns}
              shadow={gallery.shadow}
              className={gallery.className}
              captionClassName={gallery.captionClassName}
            />
          ))}
        </div>
      ) : null}
    </div>
  );
};

export default FaqAccordionItem;
