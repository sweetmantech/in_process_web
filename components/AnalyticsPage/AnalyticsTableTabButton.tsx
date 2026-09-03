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
    className={`flex items-center gap-2 rounded-md px-3 py-2 text-sm transition-colors ${
      active
        ? "bg-[#F5F3EE] font-semibold text-[#1B1504]"
        : "font-medium text-[#6B6456] hover:text-[#1B1504]"
    }`}
  >
    <span>{label}</span>
    {count !== undefined ? (
      <span className={active ? "text-[#A8862F]" : "text-[#B6B2A8]"}>{count}</span>
    ) : null}
  </button>
);

export default AnalyticsTableTabButton;
