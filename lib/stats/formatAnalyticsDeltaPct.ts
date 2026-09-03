const formatAnalyticsDeltaPct = (deltaPct: number | null): string | null => {
  if (deltaPct === null) return null;
  const sign = deltaPct > 0 ? "+" : "";
  return `${sign}${deltaPct}%`;
};

export default formatAnalyticsDeltaPct;
