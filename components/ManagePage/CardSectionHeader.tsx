interface CardSectionHeaderProps {
  dotColor: string;
  label: string;
  marginBottom?: string;
}

const CardSectionHeader = ({
  dotColor,
  label,
  marginBottom = "mb-3.5",
}: CardSectionHeaderProps) => (
  <div className={`flex items-center gap-1.5 ${marginBottom}`}>
    <span
      className="h-1.5 w-1.5 rounded-full"
      style={{ backgroundColor: dotColor, boxShadow: `0 0 8px ${dotColor}b3` }}
    />
    <span className="font-archivo text-[10.5px] uppercase tracking-[0.1em] text-grey-moss-300">
      {label}
    </span>
  </div>
);

export default CardSectionHeader;
