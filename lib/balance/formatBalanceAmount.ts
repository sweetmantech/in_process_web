const formatBalanceAmount = (amount: string): string => {
  const n = Number(amount);
  if (!Number.isFinite(n)) return amount;

  return new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 3,
    minimumFractionDigits: 0,
  }).format(n);
};

export default formatBalanceAmount;
