import { IN_PROCESS_API } from "@/lib/consts";
import { OtpLoginResponse } from "@/types/email";

const loginWithOtp = async (email: string, code: string): Promise<OtpLoginResponse> => {
  const response = await fetch(`${IN_PROCESS_API}/oauth/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, code }),
  });
  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    const message =
      typeof (data as { message?: unknown }).message === "string"
        ? (data as { message: string }).message
        : `HTTP ${response.status}`;
    throw new Error(message);
  }
  return data as OtpLoginResponse;
};

export default loginWithOtp;
