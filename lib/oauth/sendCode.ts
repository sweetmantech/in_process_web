import { IN_PROCESS_API } from "@/lib/consts";

const sendCode = async (email: string): Promise<void> => {
  const response = await fetch(`${IN_PROCESS_API}/oauth/code`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    const message =
      typeof (data as { message?: unknown }).message === "string"
        ? (data as { message: string }).message
        : `HTTP ${response.status}`;
    throw new Error(message);
  }
};

export default sendCode;
