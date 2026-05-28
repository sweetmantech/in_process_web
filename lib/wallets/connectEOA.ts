import { IN_PROCESS_API } from "@/lib/consts";

interface ConnectEOAInput {
  authHeaders: HeadersInit;
  message: string;
  signature: string;
}

const connectEOA = async ({ authHeaders, message, signature }: ConnectEOAInput) => {
  const response = await fetch(`${IN_PROCESS_API}/artists/wallets`, {
    method: "POST",
    headers: {
      ...authHeaders,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ message, signature }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const messageText =
      typeof (data as { message?: unknown }).message === "string"
        ? (data as { message: string }).message
        : `HTTP ${response.status}`;
    throw new Error(messageText);
  }
  return data;
};

export default connectEOA;
