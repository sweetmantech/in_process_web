export const isPermissionError = (error: unknown): boolean => {
  const msg = (error as any)?.message ?? "";
  return msg.includes("No authorized smart wallet found");
};
