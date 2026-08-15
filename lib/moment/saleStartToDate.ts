/** On-chain saleStart 0 means open/immediate, not Unix epoch. */
const saleStartToDate = (saleStart: number | string): Date =>
  BigInt(saleStart) === BigInt(0)
    ? new Date()
    : new Date(parseInt(saleStart.toString(), 10) * 1000);

export default saleStartToDate;
