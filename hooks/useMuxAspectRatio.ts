import { useEffect, useState } from "react";
import getMuxThumbnailUrl from "@/lib/mux/getMuxThumbnailUrl";
import toCssAspectRatio from "@/lib/mux/toCssAspectRatio";

const useMuxAspectRatio = (
  playbackId: string | null,
  storedAspectRatio: string | null | undefined,
  enabled: boolean
): string | undefined => {
  const storedRatio = toCssAspectRatio(storedAspectRatio);
  const shouldMeasure = enabled && !storedRatio && Boolean(playbackId);
  const [measured, setMeasured] = useState<{ playbackId: string; ratio: string } | null>(null);

  useEffect(() => {
    if (!shouldMeasure || !playbackId) return;
    let cancelled = false;
    const img = new Image();
    img.onload = () => {
      if (cancelled || !img.naturalWidth || !img.naturalHeight) return;
      setMeasured({ playbackId, ratio: `${img.naturalWidth} / ${img.naturalHeight}` });
    };
    img.src = getMuxThumbnailUrl(playbackId, 64);
    return () => {
      cancelled = true;
      img.onload = null;
    };
  }, [shouldMeasure, playbackId]);

  if (!enabled) return undefined;
  if (storedRatio) return storedRatio;
  return measured?.playbackId === playbackId ? measured.ratio : undefined;
};

export default useMuxAspectRatio;
