const isAnalyticsZeroValue = (value: string | number) => {
  if (typeof value === "number") return value === 0;
  const trimmed = value.trim();
  if (!trimmed) return true;
  const numeric = Number(trimmed);
  return !Number.isNaN(numeric) && numeric === 0;
};

export default isAnalyticsZeroValue;
