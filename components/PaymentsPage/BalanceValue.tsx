interface BalanceValueProps {
  value: string;
  unit: string;
}

const BalanceValue = ({ value, unit }: BalanceValueProps) => (
  <div className="flex items-baseline gap-1.5">
    <span className="font-archivo-medium text-2xl leading-none text-grey-moss-900 md:text-[28px]">
      {value}
    </span>
    <span className="text-[10px] uppercase tracking-[0.1em] text-grey-moss-300">{unit}</span>
  </div>
);

export default BalanceValue;
