"use client";

import { useUserProvider } from "@/providers/UserProvider";
import { useState, useEffect } from "react";

export function useOnboardingModal() {
  const [isOpen, setIsOpen] = useState(false);
  const { username, signedAddress } = useUserProvider();

  useEffect(() => {
    if (!signedAddress) return;
    const onboarded = window.localStorage.getItem(`onboarded:${signedAddress}`);
    const shouldOnboard = !Boolean(username) && !Boolean(onboarded);
    if (shouldOnboard) window.localStorage.setItem(`onboarded:${signedAddress}`, "true");
    setIsOpen(shouldOnboard);
  }, [username, signedAddress]);

  const closeModal = () => {
    setIsOpen(false);
  };

  return {
    isOpen,
    closeModal,
    resetCurrentSlide: () => setIsOpen(true),
  };
}
