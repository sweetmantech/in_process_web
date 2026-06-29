"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MessageSquare } from "lucide-react";
import { useMobileFeedbackDrawer } from "@/hooks/useMobileFeedbackDrawer";
import MobileFeedbackDrawerPanel from "./MobileFeedbackDrawerPanel";

const MobileFeedbackDrawer = () => {
  const { isOpen, toggle, close, feedbackHook } = useMobileFeedbackDrawer();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button type="button" onClick={toggle}>
        <MessageSquare
          className="h-[23px] w-[23px]"
          strokeWidth={1.75}
          color={isOpen ? "#1B1504" : "#B6B2A8"}
        />
      </button>

      {mounted &&
        createPortal(
          <MobileFeedbackDrawerPanel isOpen={isOpen} onClose={close} feedbackHook={feedbackHook} />,
          document.body
        )}
    </>
  );
};

export default MobileFeedbackDrawer;
