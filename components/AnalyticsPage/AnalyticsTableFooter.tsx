import analyticsTablePageCaption from "@/lib/analytics/analyticsTablePageCaption";

type Props = {
  rowCount: number;
  currentPage: number;
  limit: number;
  hasPrevPage: boolean;
  hasNextPage: boolean;
  onPrevPage: () => void;
  onNextPage: () => void;
};

const navButtonClassName =
  "rounded-[18px] border border-[#E4E0D7] bg-white px-4 py-[7px] text-xs font-semibold hover:border-[#1B1504] hover:text-[#1B1504] disabled:cursor-default disabled:text-[#C9C5BB] disabled:hover:border-[#E4E0D7]";

const AnalyticsTableFooter = ({
  rowCount,
  currentPage,
  limit,
  hasPrevPage,
  hasNextPage,
  onPrevPage,
  onNextPage,
}: Props) => (
  <div className="flex items-center justify-between border-t border-[#EDEAE2] px-6 py-3.5">
    <div className="text-[12.5px] text-[#6B6456]">
      {analyticsTablePageCaption(rowCount, currentPage, limit)}
    </div>
    <div className="flex gap-2">
      <button
        type="button"
        className={`${navButtonClassName} text-[#6B6456]`}
        onClick={onPrevPage}
        disabled={!hasPrevPage}
      >
        Previous
      </button>
      <button
        type="button"
        className={`${navButtonClassName} text-[#1B1504]`}
        onClick={onNextPage}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  </div>
);

export default AnalyticsTableFooter;
