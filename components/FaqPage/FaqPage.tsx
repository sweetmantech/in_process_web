"use client";

import { faqItemKey, faqSections } from "@/lib/faq/faqContent";
import useFaqPage from "@/hooks/useFaqPage";
import FaqAccordionItem from "./FaqAccordionItem";
import FaqAccordionSection from "./FaqAccordionSection";
import FaqSearch from "./FaqSearch";

const FaqPage = () => {
  const { main, additional, telegram, final, join, community, wallet } = faqSections;

  const {
    query,
    openIds,
    filtered,
    countLabel,
    handleQueryChange,
    toggleItem,
    hasOpenItems,
    collapseAll,
    expandAll,
  } = useFaqPage();

  return (
    <div className="relative w-full grow text-[#1B1504]">
      <main className="mx-auto max-w-[1100px] px-5 pb-[120px] pt-16 md:px-10 md:pt-24">
        <h1 className="mb-5 font-spectral text-[40px] font-normal leading-[1.02] tracking-[-0.025em] md:text-[64px]">
          Questions
        </h1>
        <p className="mb-11 font-spectral text-[16px] leading-[1.65] text-[#6B6456] md:text-[18px]">
          A platform for documenting and monetizing the creative journey — not just the final
          product.
        </p>

        <FaqSearch
          query={query}
          countLabel={countLabel}
          onQueryChange={handleQueryChange}
          hasOpenItems={hasOpenItems}
          onCollapseAll={collapseAll}
          onExpandAll={expandAll}
        />

        {filtered ? (
          <>
            <div>
              {filtered.map((item, index) => {
                const id = faqItemKey(item, `search-${index}`);
                return (
                  <FaqAccordionItem
                    key={id}
                    item={item}
                    fallbackKey={`search-${index}`}
                    open={!!openIds[id]}
                    onToggle={() => toggleItem(id)}
                  />
                );
              })}
            </div>
            {filtered.length === 0 ? (
              <div className="px-0.5 py-[60px] font-spectral text-[18px] italic text-[#6B6456]">
                Nothing found for “{query}”.
              </div>
            ) : null}
          </>
        ) : (
          <>
            <FaqAccordionSection
              items={main}
              keyPrefix="main"
              openIds={openIds}
              onToggle={toggleItem}
            />
            <FaqAccordionSection
              items={additional}
              keyPrefix="additional"
              openIds={openIds}
              onToggle={toggleItem}
            />
            <FaqAccordionSection
              items={telegram}
              keyPrefix="telegram"
              openIds={openIds}
              onToggle={toggleItem}
            />
            <FaqAccordionSection
              items={final}
              keyPrefix="final"
              openIds={openIds}
              onToggle={toggleItem}
            />
            <FaqAccordionSection
              items={join}
              keyPrefix="join"
              openIds={openIds}
              onToggle={toggleItem}
            />
            <FaqAccordionSection
              items={wallet}
              keyPrefix="wallet"
              openIds={openIds}
              onToggle={toggleItem}
            />
            <FaqAccordionSection
              items={community}
              keyPrefix="community"
              openIds={openIds}
              onToggle={toggleItem}
            />
          </>
        )}
      </main>
    </div>
  );
};

export default FaqPage;
