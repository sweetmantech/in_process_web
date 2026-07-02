"use client";

import MobileCollectDrawerPanel from "@/components/Timeline/MobileHome/MobileCollectDrawerPanel";
import { getMomentKey } from "@/lib/moment/getMomentKey";
import { getMomentSeed } from "@/lib/moment/getMomentSeed";
import { MomentCollectProvider } from "@/providers/MomentCollectProvider";
import { MomentCommentsProvider } from "@/providers/MomentCommentsProvider";
import { MomentProvider } from "@/providers/MomentProvider";
import { useMobileDrawersProvider } from "@/providers/MobileDrawersProvider";
import { useEffect, useState } from "react";
import { createPortal } from "react-dom";

const MobileCollectDrawer = () => {
  const { isDrawerOpen, collectMoment, closeDrawer } = useMobileDrawersProvider();
  const isOpen = isDrawerOpen("collect");
  const selectedMoment = collectMoment;
  const [mounted, setMounted] = useState(false);
  const [backdropReady, setBackdropReady] = useState(false);

  useEffect(() => setMounted(true), []);

  useEffect(() => {
    if (!isOpen) {
      setBackdropReady(false);
      return;
    }

    const timer = window.setTimeout(() => setBackdropReady(true), 300);
    return () => window.clearTimeout(timer);
  }, [isOpen]);

  if (!mounted || (!isOpen && !selectedMoment)) return null;

  const moment = selectedMoment ? getMomentKey(selectedMoment) : null;

  return createPortal(
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 z-40 ${backdropReady ? "" : "pointer-events-none"}`}
          onClick={backdropReady ? closeDrawer : undefined}
        />
      )}
      <div
        className={`fixed bottom-[calc(74px+env(safe-area-inset-bottom,0px))] left-0 right-0 top-0 z-50 overflow-y-auto bg-white transition-transform duration-300 ease-out ${
          isOpen ? "translate-y-0" : "pointer-events-none translate-y-full"
        }`}
      >
        {moment && selectedMoment && (
          <MomentProvider
            key={selectedMoment.id}
            moment={moment}
            initialData={getMomentSeed(selectedMoment)}
          >
            <MomentCommentsProvider>
              <MomentCollectProvider>
                <MobileCollectDrawerPanel onClose={closeDrawer} />
              </MomentCollectProvider>
            </MomentCommentsProvider>
          </MomentProvider>
        )}
      </div>
    </>,
    document.body
  );
};

export default MobileCollectDrawer;
