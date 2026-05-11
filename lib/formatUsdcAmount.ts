/** Plain numeric string for USDC amounts (no currency symbol). */
function formatUsdcAmount(amount: number): string {
  const n = Number.isFinite(amount) ? amount : 0;
  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 6,
    minimumFractionDigits: 0,
  }).format(n);
}

export default formatUsdcAmount;
