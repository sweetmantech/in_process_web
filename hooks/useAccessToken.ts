import { useState } from "react";
import { usePrivy } from "@privy-io/react-auth";
import { toast } from "sonner";
import getTokenExpiry from "@/lib/auth/getTokenExpiry";

const useAccessToken = () => {
  const { getAccessToken } = usePrivy();
  const [expiresAt, setExpiresAt] = useState<Date | null>(null);

  const copyAccessToken = async () => {
    try {
      const token = await getAccessToken();
      if (!token) {
        toast.error("No access token found");
        return;
      }
      await navigator.clipboard.writeText(token);
      setExpiresAt(getTokenExpiry(token));
      toast.success("copied!");
    } catch {
      toast.error("Failed to copy access token");
    }
  };

  return { copyAccessToken, expiresAt };
};

export default useAccessToken;
