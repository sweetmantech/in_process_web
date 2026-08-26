"use client";

import type { FaqItem } from "@/lib/faq/faqContent";
import { faqItemKey } from "@/lib/faq/faqContent";
import FaqAccordionItem from "./FaqAccordionItem";

interface FaqAccordionSectionProps {
  items: FaqItem[];
  openIds: Record<string, boolean>;
  onToggle: (id: string) => void;
  keyPrefix: string;
}

const FaqAccordionSection = ({ items, openIds, onToggle, keyPrefix }: FaqAccordionSectionProps) => {
  return (
    <div>
      {items.map((item, index) => {
        const id = faqItemKey(item, `${keyPrefix}-${index}`);
        return (
          <FaqAccordionItem
            key={id}
            item={item}
            fallbackKey={`${keyPrefix}-${index}`}
            open={!!openIds[id]}
            onToggle={() => onToggle(id)}
          />
        );
      })}
    </div>
  );
};

export default FaqAccordionSection;
