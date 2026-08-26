interface FaqSearchProps {
  query: string;
  countLabel: string;
  onQueryChange: (value: string) => void;
  hasOpenItems: boolean;
  onCollapseAll: () => void;
  onExpandAll: () => void;
}

const SearchIcon = () => (
  <svg
    aria-hidden
    viewBox="0 0 24 24"
    className="size-4 shrink-0 text-[#B6B2A8]"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.6"
  >
    <circle cx="11" cy="11" r="7" />
    <path d="M20 20l-3.5-3.5" strokeLinecap="round" />
  </svg>
);

const FaqSearch = ({
  query,
  countLabel,
  onQueryChange,
  hasOpenItems,
  onCollapseAll,
  onExpandAll,
}: FaqSearchProps) => {
  return (
    <div className="mb-2 flex items-center gap-2.5 border-b border-[#D9D5CB] px-0.5 pb-2.5">
      <SearchIcon />
      <input
        type="search"
        value={query}
        onChange={(event) => onQueryChange(event.target.value)}
        placeholder="Search"
        aria-label="Search FAQ"
        className="min-w-0 flex-1 border-none bg-transparent py-0.5 font-spectral text-[16px] text-[#1B1504] outline-none placeholder:text-[#B6B2A8]"
      />
      <span className="shrink-0 text-[12px] tracking-[0.04em] text-[#B6B2A8]">{countLabel}</span>
      <button
        type="button"
        onClick={hasOpenItems ? onCollapseAll : onExpandAll}
        aria-label={hasOpenItems ? "Hide all answers" : "Show all answers"}
        className="shrink-0 text-[20px] font-light leading-none text-[#B6B2A8] transition-colors hover:text-[#1B1504]"
      >
        {hasOpenItems ? "–" : "+"}
      </button>
    </div>
  );
};

export default FaqSearch;
