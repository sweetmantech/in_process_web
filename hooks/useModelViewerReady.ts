import { useEffect, useState } from "react";

export const useModelViewerReady = (): boolean => {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let active = true;
    import("@google/model-viewer").then(() => {
      if (active) setReady(true);
    });
    return () => {
      active = false;
    };
  }, []);

  return ready;
};
