"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { MessageSquare } from "lucide-react";
import useSubmitFeedback from "@/hooks/useSubmitFeedback";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import FeedbackDrawerPanel from "./FeedbackDrawerPanel";

const FeedbackDrawer = () => {
  const { toggleDrawer, closeDrawer, isDrawerOpen } = useMobileDrawersProvider();
  const feedbackHook = useSubmitFeedback();
  const isOpen = isDrawerOpen("feedback");
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <>
      <button type="button" onClick={() => toggleDrawer("feedback")}>
        <MessageSquare
          className="h-[23px] w-[23px]"
          strokeWidth={1.75}
          color={isOpen ? "#1B1504" : "#B6B2A8"}
        />
      </button>

      {mounted &&
        createPortal(
          <FeedbackDrawerPanel isOpen={isOpen} onClose={closeDrawer} feedbackHook={feedbackHook} />,
          document.body
        )}
    </>
  );
};

export default FeedbackDrawer;
