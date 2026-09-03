import isAnalyticsZeroValue from "@/lib/analytics/isAnalyticsZeroValue";

type Props = {
  value: string | number;
};

const AnalyticsTableNumericCell = ({ value }: Props) => {
  const isZero = isAnalyticsZeroValue(value);
  return (
    <div
      className={`text-right text-[13.5px] tabular-nums ${
        isZero ? "text-[#C9C5BB]" : "text-[#1B1504]"
      }`}
    >
      {value}
    </div>
  );
};

export default AnalyticsTableNumericCell;
