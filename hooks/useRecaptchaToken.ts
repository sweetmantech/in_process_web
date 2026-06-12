"use client";

import { useCallback } from "react";
import { useGoogleReCaptcha } from "react-google-recaptcha-v3";

const useRecaptchaToken = (action: string) => {
  const { executeRecaptcha } = useGoogleReCaptcha();
  return useCallback(async (): Promise<string | undefined> => {
    if (!executeRecaptcha) return undefined;
    return executeRecaptcha(action).catch(() => undefined);
  }, [executeRecaptcha, action]);
};

export default useRecaptchaToken;
