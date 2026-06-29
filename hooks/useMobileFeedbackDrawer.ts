"use client";

import useSubmitFeedback from "@/hooks/useSubmitFeedback";

export const useMobileFeedbackDrawer = () => {
  const feedbackHook = useSubmitFeedback();
  const { isOpenModal: isOpen, setIsOpenModal } = feedbackHook;

  const toggle = () => setIsOpenModal(!isOpen);
  const close = () => setIsOpenModal(false);

  return { isOpen, toggle, close, feedbackHook };
};
