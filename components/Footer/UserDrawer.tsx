"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { User } from "lucide-react";
import { useMobileUserDrawer } from "@/hooks/useMobileUserDrawer";
import UserDrawerPanel from "./UserDrawerPanel";

const UserDrawer = () => {
  const { isOpen, toggle, close, onTimeline, onManage, onTopup, onLogout, isMiniApp, displayName } =
    useMobileUserDrawer();

  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <>
      <button type="button" onClick={toggle}>
        <User
          className="h-[23px] w-[23px]"
          strokeWidth={1.75}
          color={isOpen ? "#1B1504" : "#B6B2A8"}
        />
      </button>

      {mounted &&
        createPortal(
          <UserDrawerPanel
            isOpen={isOpen}
            onClose={close}
            onTimeline={onTimeline}
            onManage={onManage}
            onTopup={onTopup}
            onLogout={onLogout}
            isMiniApp={isMiniApp}
            displayName={displayName}
          />,
          document.body
        )}
    </>
  );
};

export default UserDrawer;
