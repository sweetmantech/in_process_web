const resolvePayoutRecipient = (
  isMiniApp: boolean,
  hasEOA: boolean,
  primaryWallet: string | undefined | null,
  smartWallet: string | undefined | null
): string | undefined | null => {
  return isMiniApp || hasEOA ? primaryWallet : smartWallet;
};

export default resolvePayoutRecipient;
