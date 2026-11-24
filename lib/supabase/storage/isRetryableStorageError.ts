export const isRetryableStorageError = (error: { status?: number }): boolean =>
  error.status === undefined || error.status === 429 || error.status >= 500;
