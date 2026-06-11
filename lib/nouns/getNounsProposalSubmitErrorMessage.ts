import { isUserRejection } from "@/lib/viem/isUserRejection";

const getErrorText = (error: unknown): string => {
  if (!error || typeof error !== "object") return "";

  const err = error as {
    message?: string;
    shortMessage?: string;
    cause?: unknown;
  };

  return [err.shortMessage, err.message, getErrorText(err.cause)].filter(Boolean).join(" ");
};

export const getNounsProposalSubmitErrorMessage = (error: unknown): string => {
  if (isUserRejection(error)) {
    return "Transaction rejected";
  }

  const text = getErrorText(error).toLowerCase();

  if (text.includes("threshold") || text.includes("votes below")) {
    return "You don't have enough Nouns voting power to submit this proposal.";
  }

  if (text.includes("pending proposal")) {
    return "You already have a pending proposal.";
  }

  if (text.includes("too many actions")) {
    return "This proposal has too many actions.";
  }

  return "Failed to submit proposal. Please try again.";
};
