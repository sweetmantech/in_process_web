import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import { EMAIL_VERIFICATION_STATUS } from "@/types/email";
import sendCode from "@/lib/oauth/sendCode";
import loginWithOtp from "@/lib/oauth/loginWithOtp";
import { useUserProvider } from "@/providers/UserProvider";
import updateProfile from "@/lib/artists/updateProfile";
import { useMiniAppProvider } from "@/providers/MiniAppProvider";

export const useEmailVerify = () => {
  const { context } = useMiniAppProvider();
  const [email, setEmail] = useState<string>("");
  const [code, setCode] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [status, setStatus] = useState<EMAIL_VERIFICATION_STATUS>(
    EMAIL_VERIFICATION_STATUS.ENTER_EMAIL
  );
  const { signedAddress: farcasterAddress } = useUserProvider();
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const handleSendCode = async () => {
    if (!email.trim()) {
      toast.error("Email is required");
      return;
    }
    setIsLoading(true);
    try {
      await sendCode(email.trim());
      setStatus(EMAIL_VERIFICATION_STATUS.ENTER_CODE);
    } catch (error: any) {
      toast.error(error?.message || "Failed to send verification code");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (!code.trim()) {
      toast.error("Verification code is required");
      return;
    }
    setIsLoading(true);
    try {
      const { token } = await loginWithOtp(email.trim(), code.trim());
      if (!farcasterAddress) throw new Error("No Farcaster wallet found");
      await updateProfile({
        authHeaders: { Authorization: `Bearer ${token}` },
        username: context?.user?.displayName || undefined,
      });
      setStatus(EMAIL_VERIFICATION_STATUS.VERIFIED);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      closeTimerRef.current = setTimeout(() => setIsDialogOpen(false), 10000);
    } catch (error: any) {
      toast.error(error?.message || "Failed to verify code");
    } finally {
      setIsLoading(false);
    }
  };

  const resetDialog = (open: boolean) => {
    if (!open) {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
      setEmail("");
      setCode("");
      setStatus(EMAIL_VERIFICATION_STATUS.ENTER_EMAIL);
    }
    setIsDialogOpen(open);
  };

  return {
    email,
    setEmail,
    code,
    setCode,
    isLoading,
    isDialogOpen,
    setIsDialogOpen: resetDialog,
    status,
    handleSendCode,
    handleVerifyCode,
  };
};
