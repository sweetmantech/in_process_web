const SMART_WALLET_TYPES = ["payment", "operator"];

export const isSmartWalletType = (type?: string | null): boolean =>
  !!type && SMART_WALLET_TYPES.includes(type);
