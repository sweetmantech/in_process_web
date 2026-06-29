"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MessageSquare } from "lucide-react";
import useSubmitFeedback from "@/hooks/useSubmitFeedback";
import MobileFeedbackDrawerPanel from "./MobileFeedbackDrawerPanel";

const MobileFeedbackDrawer = () => {
  const feedbackHook = useSubmitFeedback();
  const { isOpenModal: isOpen, setIsOpenModal } = feedbackHook;
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button type="button" onClick={() => setIsOpenModal(!isOpen)}>
        <MessageSquare
          className="h-[23px] w-[23px]"
          strokeWidth={1.75}
          color={isOpen ? "#1B1504" : "#B6B2A8"}
        />
      </button>

      {mounted &&
        createPortal(
          <MobileFeedbackDrawerPanel
            isOpen={isOpen}
            onClose={() => setIsOpenModal(false)}
            feedbackHook={feedbackHook}
          />,
          document.body
        )}
    </>
  );
};

export default MobileFeedbackDrawer;
