// JS Date's representable range is +/-8,640,000,000,000,000ms from epoch.
// saleEnd's on-chain "forever" sentinel (uint64 max) is far beyond that, and
// loses precision when serialized as a JS number, so compare by magnitude
// rather than exact equality to the sentinel value.
const MAX_VALID_DATE_MS = 8640000000000000;

export const isOpenEndedSale = (saleEnd: number | string): boolean => {
  const seconds = Number(saleEnd);
  return seconds <= 0 || seconds * 1000 > MAX_VALID_DATE_MS;
};

export default isOpenEndedSale;
