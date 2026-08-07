type FormatOptions = {
  maximumFractionDigits?: number;
};

export function formatStatValue(
  value: string,
  { maximumFractionDigits = 2 }: FormatOptions = {}
): string {
  const amount = Number(value);
  if (!Number.isFinite(amount)) return "0";
  return amount.toLocaleString("en-US", {
    maximumFractionDigits,
    minimumFractionDigits: 0,
  });
}
