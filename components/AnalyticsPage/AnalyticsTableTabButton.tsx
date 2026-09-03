type Props = {
  label: string;
  count?: number;
  active: boolean;
  onClick: () => void;
};

const AnalyticsTableTabButton = ({ label, count, active, onClick }: Props) => (
  <button
    type="button"
    onClick={onClick}
    className={`inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-lg px-[15px] py-[9px] text-[13px] ${
      active
        ? "bg-[#F5F3EE] font-semibold text-[#1B1504]"
        : "font-medium text-[#6B6456] hover:text-[#1B1504]"
    }`}
  >
    <span>{label}</span>
    {count !== undefined ? (
      <span className={`text-[11px] tabular-nums ${active ? "text-[#A8862F]" : "text-[#B6B2A8]"}`}>
        {count}
      </span>
    ) : null}
  </button>
);

export default AnalyticsTableTabButton;
