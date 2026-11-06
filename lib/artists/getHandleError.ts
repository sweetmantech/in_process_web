const HANDLE_REGEX = /^[a-z0-9][a-z0-9._-]{1,28}[a-z0-9]$/;

const getHandleError = (handle: string): string | null => {
  if (!handle) return null;
  if (!HANDLE_REGEX.test(handle)) {
    return 'Use 3-30 characters of a-z, 0-9, ".", "_" or "-", starting and ending with a letter or number.';
  }
  if (handle.startsWith("0x")) return "Handle cannot start with 0x.";
  return null;
};

export default getHandleError;
