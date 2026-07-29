function isCommentHolderError(error: unknown): boolean {
  const message = (error as Error)?.message ?? "";
  return message.includes("Collect this moment before commenting.");
}

export default isCommentHolderError;
