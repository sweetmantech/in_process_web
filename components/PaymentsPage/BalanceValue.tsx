interface BalanceValueProps {
  value: string;
  unit: string;
}

const BalanceValue = ({ value, unit }: BalanceValueProps) => (
  <div className="flex items-baseline gap-[7px]">
    <span className="font-archivo-bold text-[30px] leading-none tracking-[-.02em] text-[#a8862f]">
      {value}
    </span>
    <span className="font-archivo-medium text-sm text-[#6B6456]">{unit}</span>
  </div>
);

export default BalanceValue;
